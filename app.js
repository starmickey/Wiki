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

app.get('/articles', function (req, res) {

    mongooseInterface.getAllArticles().then(
        function onFullfillment(articles) {
            res.send(articles)
        }, function (error) {
            res.send(error);
        }
    )
})

app.post('/articles', function (req, res) {
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


// ================= PORT LISTENER =================

app.listen(process.env.PORT || 3000, function () {
    console.log('Server running');
})