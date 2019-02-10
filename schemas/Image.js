const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require('../schemas/Comment')

const ImageSchema = new Schema({
    text: {
        type: String,
        default: '',
        max: 200
    },
    userTags: [Schema.Types.ObjectId],
    machineTags: [Schema.Types.ObjectId],
    image: {
        type: Buffer,
        required: true
    },
    likes: [Schema.Types.ObjectId],
    comments: [Comment],
    date: {
        type: Date, default: Date.now
    }
})

module.exports = ImageSchema