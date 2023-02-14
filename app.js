// ===================== IMPORTS =====================

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongooseInterface = require(__dirname + '/mongoose.js');
const { ArticleDTO } = require(__dirname + '/data-objects/ArticleDTO.js');



// ================ CONFIG EXPRESS APP ================

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



// ============= HTTPS REQUESTS HANDLERS =============

// -------- Requests targeting ALL the articles --------

app.route('/articles')

    .get(function (req, res) {
        mongooseInterface.getAllArticles().then(
            function onFullfillment(articles) {
                res.send(articles)
            }, function (error) {
                res.send(error);
            }
        )
    })

    .post(function (req, res) {
        const articleDTO = new ArticleDTO('', req.body.title, req.body.content);
        mongooseInterface.createArticle(articleDTO).then(
            function onfulfilled(article) {
                res.send('Article successfully created');
            },
            function onrejected(reason) {
                res.send(reason);
            }
        );
    })

    .delete(function (req, res) {
        mongooseInterface.deleteAllArticles().then(
            function onfulfilled(successMessage) {
                res.send(successMessage);
            },
            function onrejected(reason) {
                res.send(reason);
            }
        )
    });



// ---------- Requests targeting a SPECIFIC article ----------

app.route('/articles/:articleTitle')
    .get(function (req, res) {
        mongooseInterface.getArticleByTitle(req.params.articleTitle).then(
            function onfulfilled(article) {
                res.send(article);
            },
            function onrejection(reason) {
                res.send(reason);
            }
        )
    })
    
    .put(function (req, res) {
        const changesDTO = new ArticleDTO('', req.body.title, req.body.content);
        mongooseInterface.putArticle(req.params.articleTitle,changesDTO).then(
            function onfulfilled(article) {
                res.send(article);
            },
            function onrejection(reason) {
                res.send(reason);
            }
        )
    });




// ================= PORT LISTENER =================

app.listen(process.env.PORT || 3000, function () {
    console.log('Server running');
})