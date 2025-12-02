const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Tạo thư mục uploads nếu chưa tồn tại
const uploadDir = path.join(__dirname, "../uploads");
const pdfDir = path.join(uploadDir, "pdfs");
const imageDir = path.join(uploadDir, "images");

[uploadDir, pdfDir, imageDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Cấu hình storage cho PDF
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, pdfDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, "pdf-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// Cấu hình storage cho hình ảnh
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, "img-" + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter cho PDF
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file PDF!"), false);
    }
};

// File filter cho hình ảnh
const imageFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file hình ảnh (JPEG, PNG, GIF)!"), false);
    }
};

// Upload PDF (tối đa 10MB)
const uploadPDF = multer({
    storage: pdfStorage,
    fileFilter: pdfFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Upload hình ảnh (tối đa 5MB mỗi file, tối đa 10 files)
const uploadImages = multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = {
    uploadPDF,
    uploadImages
};
