const mongoose = require('mongoose');
const Article = new mongoose.Schema({
    author: {
       type: String,
       required: true
    },
    title: {
       type: String,
       required: true
    },
    body: {
       type: String,
       required: true
    },
   
    comments: [{ 
       content:{
          type: String,
          required: true
       }
    }],
 });

module.exports = Article;