const mongoose = require('mongoose');
const articleSchema = require('./schema');

const ArticleModel = mongoose.model('article' , articleSchema);

module.exports = {ArticleModel}