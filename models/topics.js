const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: String
})

const Topic = mongoose.model('TopicCollection', topicSchema);

module.exports = Topic; 
