const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        const Article = require("./models/Article");

        // Find all articles with pdfFile
        const articles = await Article.find({ "pdfFile.path": { $exists: true } });

        console.log(`Found ${articles.length} articles with PDF files`);

        for (let article of articles) {
            if (article.pdfFile && article.pdfFile.path.includes('backend')) {
                // Fix PDF path
                article.pdfFile.path = article.pdfFile.path.replace(/\\/g, '/').split('backend/')[1];
                console.log(`Fixed PDF path for article: ${article.title}`);
            }

            // Fix image paths
            if (article.images && article.images.length > 0) {
                article.images = article.images.map(img => {
                    if (img.path.includes('backend')) {
                        img.path = img.path.replace(/\\/g, '/').split('backend/')[1];
                    }
                    return img;
                });
                console.log(`Fixed image paths for article: ${article.title}`);
            }

            await article.save();
        }

        console.log("All paths fixed!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
