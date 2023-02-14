const mongoose = require('mongoose');
const { ArticleDTO } = require(__dirname + '/data-objects/ArticleDTO.js');


// ============= SET MONGOOSE CONNECTION =============

connectMongoose().catch(err => console.log(err));

async function connectMongoose() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
}


// ===================== MODELS =====================

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    rmDate: {
        type: Date,
        default: null
    }
})

const Article = new mongoose.model('article', articleSchema);


// ================ EXPORT FUNCTIONS ================

function getAllArticles() {
    return new Promise((resolve, reject) => {
        
        Article.find({rmDate: null}, function(error, articles) {
            if (error) {
                reject(error);
            } else {
                const articleDTOs = [];
                articles.forEach(article => {
                    articleDTOs.push(new ArticleDTO(article.id, article.title, article.content));
                });

                resolve(articleDTOs);
            }
        })
    })
}

exports.getAllArticles = getAllArticles;


function createArticle(articleDTO) {
    const newArticle = new Article({
        title: articleDTO.title,
        content: articleDTO.content
    });

    return newArticle.save();
}

exports.createArticle = createArticle;
