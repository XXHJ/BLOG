const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog')

const userSchema = new mongoose.Schema({
  name: String,
  password: String
})

const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  content: String,
  gist: String,
  labels: Array
})

const commentSchema = new mongoose.Schema({
  articleId: String,
  username: String,
  comment: String,
  createDate: String
})

const Models = {
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('Article', articleSchema),
  Comment: mongoose.model('Comment', commentSchema)
}

module.exports = Models
