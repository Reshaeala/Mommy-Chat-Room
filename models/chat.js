const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  username: String,
  title: String,
  entry: String,
},{timestamps:true});

const Chat = mongoose.model('ChatRoom', chatSchema)

module.exports = Chat;
