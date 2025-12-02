const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { uploadPDF, uploadImages } = require("../middleware/upload");
const { getGridFSBucket } = require("../config/gridfs");
const { Readable } = require('stream');

// GET tất cả bài báo (có phân trang và lọc)
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, category, status = "published", search } = req.query;

        const query = {};
        if (category) query.category = category;
        if (status) query.status = status;
        if (search) {
            query.$text = { $search: search };
        }

        const articles = await Article.find(query)
            .sort({ publishDate: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select("-content"); // Không trả về nội dung đầy đủ trong danh sách

        const count = await Article.countDocuments(query);

        res.json({
            articles,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET một bài báo cụ thể
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Không tìm thấy bài báo" });
        }

        // Tăng lượt xem
        article.views += 1;
        await article.save();

        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST tạo bài báo mới (với upload PDF và hình ảnh)
router.post("/", uploadPDF.single("pdf"), async (req, res) => {
    try {
        const articleData = {
            title: req.body.title,
            abstract: req.body.abstract,
            content: req.body.content,
            category: req.body.category,
            status: req.body.status || "draft"
        };

        // Parse authors từ JSON string
        if (req.body.authors) {
            articleData.authors = JSON.parse(req.body.authors);
        }

        // Parse keywords từ JSON string
        if (req.body.keywords) {
            articleData.keywords = JSON.parse(req.body.keywords);
        }

        // Parse references từ JSON string
        if (req.body.references) {
            articleData.references = JSON.parse(req.body.references);
        }

        // Upload PDF to GridFS nếu có
        if (req.file) {
            try {
                const bucket = getGridFSBucket();
                const filename = `pdf-${Date.now()}-${req.file.originalname}`;

                // Create readable stream from buffer
                const readableStream = Readable.from(req.file.buffer);

                // Upload to GridFS
                const uploadStream = bucket.openUploadStream(filename, {
                    contentType: 'application/pdf',
                    metadata: {
                        originalName: req.file.originalname,
                        uploadDate: new Date()
                    }
                });

                await new Promise((resolve, reject) => {
                    readableStream.pipe(uploadStream)
                        .on('error', reject)
                        .on('finish', resolve);
                });

                articleData.pdfFile = {
                    filename: req.file.originalname,
                    path: uploadStream.id.toString(), // Store GridFS file ID
                    size: req.file.size
                };

                console.log("PDF uploaded to GridFS:", uploadStream.id);
            } catch (uploadError) {
                console.error("Failed to upload PDF to GridFS:", uploadError);
                return res.status(500).json({
                    message: "Failed to upload PDF",
                    error: uploadError.message
                });
            }
        } const article = new Article(articleData);
        const savedArticle = await article.save();

        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST upload hình ảnh cho bài báo
router.post("/:id/images", uploadImages.array("images", 10), async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Không tìm thấy bài báo" });
        }

        // Upload images to GridFS
        const bucket = getGridFSBucket();
        const uploadPromises = req.files.map((file, index) => {
            return new Promise((resolve, reject) => {
                const filename = `img-${Date.now()}-${index}-${file.originalname}`;
                const readableStream = Readable.from(file.buffer);

                const uploadStream = bucket.openUploadStream(filename, {
                    contentType: file.mimetype,
                    metadata: {
                        originalName: file.originalname,
                        uploadDate: new Date()
                    }
                });

                readableStream.pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', () => {
                        resolve({
                            filename: file.originalname,
                            path: uploadStream.id.toString(),
                            caption: req.body[`caption_${index}`] || ""
                        });
                    });
            });
        });

        const images = await Promise.all(uploadPromises);
        article.images.push(...images);
        await article.save();

        res.json({ message: "Upload hình ảnh thành công", images });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT cập nhật bài báo
router.put("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Không tìm thấy bài báo" });
        }

        // Cập nhật các trường
        const allowedFields = ["title", "authors", "abstract", "content", "keywords", "category", "status", "references"];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                article[field] = req.body[field];
            }
        });

        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE xóa bài báo
router.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Không tìm thấy bài báo" });
        }

        await article.deleteOne();
        res.json({ message: "Đã xóa bài báo thành công" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET file từ GridFS (PDF hoặc Image)
router.get("/file/:fileId", async (req, res) => {
    try {
        const bucket = getGridFSBucket();
        const { ObjectId } = require('mongodb');
        const fileId = new ObjectId(req.params.fileId);

        // Find file info
        const files = await bucket.find({ _id: fileId }).toArray();
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const file = files[0];

        // Set proper headers
        res.set('Content-Type', file.contentType || 'application/pdf');
        res.set('Content-Disposition', `inline; filename="${file.filename}"`);

        // Stream file to response
        const downloadStream = bucket.openDownloadStream(fileId);
        downloadStream.pipe(res);

        downloadStream.on('error', (error) => {
            console.error("Error streaming file:", error);
            res.status(500).json({ message: "Error streaming file" });
        });
    } catch (error) {
        console.error("Error retrieving file:", error);
        res.status(500).json({ message: error.message });
    }
});

// GET danh sách categories
router.get("/meta/categories", (req, res) => {
    res.json({
        categories: [
            { value: "research", label: "Nghiên cứu" },
            { value: "review", label: "Tổng quan" },
            { value: "case-study", label: "Nghiên cứu điển hình" },
            { value: "technical", label: "Kỹ thuật" },
            { value: "news", label: "Tin tức" }
        ]
    });
});

module.exports = router;
