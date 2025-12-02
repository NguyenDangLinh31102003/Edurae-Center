const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    affiliation: { type: String },
    email: { type: String }
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    authors: [authorSchema],
    abstract: {
        type: String,
        required: true
    },
    keywords: [String],
    content: {
        type: String,
        required: false
    },
    pdfFile: {
        filename: String,
        path: String,
        size: Number
    },
    images: [{
        filename: String,
        path: String,
        caption: String
    }],
    category: {
        type: String,
        enum: ['research', 'review', 'case-study', 'technical', 'news'],
        default: 'research'
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    references: [String]
}, {
    timestamps: true
});

// Index để tìm kiếm nhanh
articleSchema.index({ title: 'text', abstract: 'text', keywords: 'text' });
articleSchema.index({ publishDate: -1 });
articleSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model("Article", articleSchema);
