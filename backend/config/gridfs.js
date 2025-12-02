const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

let bucket;

// Initialize GridFS bucket after MongoDB connection
const initGridFS = () => {
    const db = mongoose.connection.db;
    bucket = new GridFSBucket(db, {
        bucketName: 'uploads'
    });
    console.log('GridFS initialized');
    return bucket;
};

const getGridFSBucket = () => {
    if (!bucket) {
        bucket = initGridFS();
    }
    return bucket;
};

module.exports = { initGridFS, getGridFSBucket };
