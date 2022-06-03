const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Users Collection
const UserSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   blogs: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
   }]
});

// Schema for the Blogs Collection
const BlogSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   body: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
   },
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }]
})

// Schema for the Comments Collection
const CommentSchema = new Schema({
   body: String,
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
   },
})


const User = mongoose.model("User", UserSchema);
const Blog = mongoose.model("Blog", BlogSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = {User, Blog, Comment}