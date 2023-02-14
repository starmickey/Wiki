// ===================== IMPORTS =====================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// ================ CONFIG EXPRESS APP ================

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


// ============= SET MONGOOSE CONNECTION =============

connectMongoose().catch(err => console.log(err));

async function connectMongoose() {
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB');
}



// ============= HTTPS REQUESTS HANDLERS =============

app.get('/', function (req, res) {
    res.render('index');
})


// ================= PORT LISTENER =================

app.listen(process.env.PORT || 3000, function () {
    console.log('Server running');
})