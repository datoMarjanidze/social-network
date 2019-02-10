const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = Schema({
    personID: Schema.Types.ObjectId,
    partnerID: Schema.Types.ObjectId,
    content: []
})

module.exports = mongoose.model('Conversation', ConversationSchema)