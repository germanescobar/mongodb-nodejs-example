const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true
  },
  content: String,
  tags: [String]
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post