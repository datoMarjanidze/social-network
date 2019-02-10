const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    authorID: Schema.Types.ObjectId, 
    content: {
        type: String,
        max: 200
    },
    date: {type: Date, default: Date.now}
})

module.exports = CommentSchema