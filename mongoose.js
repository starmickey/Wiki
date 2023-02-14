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

// ------- CRUD operations for ALL the articles -------

exports.getAllArticles = function () {

    return new Promise((resolve, reject) => {

        Article.find({ rmDate: null }, function (error, articles) {
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



exports.createArticle = function (articleDTO) {
    const newArticle = new Article({
        title: articleDTO.title,
        content: articleDTO.content
    });

    return newArticle.save();
}




exports.deleteAllArticles = function () {

    const deletePromises = [];

    return new Promise((resolve, reject) => {

        Article.find({ rmDate: null }, function (error, articles) {
            if (error) {
                reject(error);
            } else {

                articles.forEach(article => {
                    article.rmDate = new Date();
                    deletePromises.push(article.save());
                });

                Promise.all(deletePromises).then(
                    function onfulfilled(values) {
                        resolve('articles successfully deleted');
                    },
                    function onrejected(reason) {
                        reject(reason);
                    }
                )
            }
        })
    })
}





// ----- CRUD operations for a SPECIFIC article -----

exports.getArticleByTitle = function (articleTitle) {

    return new Promise((resolve, reject) => {

        Article.findOne({ title: articleTitle, rmDate: null }, function (error, article) {
            if (error) {
                reject(error);

            } else if (article === null) {
                resolve(null);

            } else {
                resolve(new ArticleDTO(article.id, article.title, article.content));
            }
        })
    })
}


exports.putArticle = function (articleTitle, changesDTO) {

    return new Promise((resolve, reject) => {

        Article.findOneAndUpdate(
            { title: articleTitle, rmDate: null },
            { title: changesDTO.title, content: changesDTO.content },
            { new: true },

        ).then(
            function onfulfilled(newArticle) {
                if (newArticle === null) {
                    reject('article not found')
                } else {
                    resolve(new ArticleDTO(newArticle.id, newArticle.title, newArticle.content));
                }
            },
            function onrejected(reason) {
                resolve(reason)
            }
        )

    })


    if (newArticle === null) {
        return 'article not found'
    } else {
        return new ArticleDTO(newArticle.id, newArticle.title, newArticle.content);
    }

}
