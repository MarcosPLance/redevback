const mongoose = require('mongoose')
const { Schema } = mongoose

const TopicSchema = new Schema({
    title: String
})

module.exports = mongoose.model('topic', TopicSchema)