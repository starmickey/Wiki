// ===================== IMPORTS =====================

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongooseInterface = require(__dirname + '/mongoose.js');


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


// ================= PORT LISTENER =================

app.listen(process.env.PORT || 3000, function () {
    console.log('Server running');
})