const multer = require("multer");
const path = require("path");

// Sử dụng memory storage để upload lên Cloudinary
const storage = multer.memoryStorage();

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
    storage: storage,
    fileFilter: pdfFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Upload hình ảnh (tối đa 5MB mỗi file, tối đa 10 files)
const uploadImages = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = {
    uploadPDF,
    uploadImages
};
