const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const Image = require('../schemas/Image')

const UserSchema = Schema({
    firstName: {
        type: String,
        min: 1,
        max: 15,
        required: true
    },
    lastName: {
        type:String,
        min: 1,
        max: 15,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 30,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min: 8,
        max: 40,
        required: true
    },
    friends: {
        type: Array,
        required: false
    },
    followers: {
        type: Array,
        required: false
    },
    following: {
        type: Array,
        required: false
    },
    conversations: [{partnerID: Schema.Types.ObjectId, conversationID: Schema.Types.ObjectId}],
    profileImages: [Image],
    coverImages: [Image],
    postImages: [Image]
})

UserSchema.statics.validatefirstOrLastName = (name, callback) => {
    let isValid = true
    if(!name)
        isValid = false
    else if(name.length > 15)
        isValid = false
    else if(! /^[a-zA-Z]+$/.exec(name))
        isValid = false
    callback(isValid)
}
UserSchema.statics.validateEmail = function(email, callback){
    let isValid = false
    let emailRegex = /^((\.?[a-zA-Z0-9]+\.?)*)@([a-zA-Z0-9]+)(\.)([a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/
    if(emailRegex.exec(email)){
        isValid = true
        callback(isValid)
    }
    else
        callback(isValid)
}
UserSchema.statics.emailExists = function(email, callback){
    this.find({email: email}, (err, docs) => {
        if(err)
            callback(err, null)
        else if(!docs.length)
            callback(err, false)
        else if(docs.length)
            callback(err, true)
    })
}
UserSchema.statics.validatePassword = (password, confirmPassword, callback) => {
    let isValid = true
    if(!password && !confirmPassword)
        isValid = false
    else if(password.length > 40 && confirmPassword.length > 40)
        isValid = false
    else if(password !== confirmPassword)
        isValid = false
    callback(isValid)
}
UserSchema.statics.encryptPassword = (plainPassword, callback) => {
    let saltRounds = 10
    bcrypt.genSalt(saltRounds, (error, salt) => {
        if(!error)
            bcrypt.hash(plainPassword, salt, (error, hash) => {
                if(!error)
                    callback(hash)
                else
                    console.log(error)
            })
        else
            console.log(err)
    })
}
UserSchema.statics.comparePasswords = (plainPassword, hash, callback) => {
    bcrypt.compare(plainPassword, hash, (err, match) => {
        callback(err, match)
    })
}

module.exports = mongoose.model('User', UserSchema)