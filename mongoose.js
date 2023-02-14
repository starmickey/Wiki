const mongoose = require('mongoose');


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