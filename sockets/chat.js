const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment
const User = require('../models/User')
const Conversation = require('../models/Conversation')
const async = require('async')

module.exports = io => {
    const chatNamespace = io.of('/chat')

    chatNamespace.use((clientSocket, next) => {
        const socketToken = clientSocket.handshake.headers['socket-token']
        
        jwt.verify(socketToken, process.env.JWT_SECRET, (err, authorisedUser) => {
            if(!err){
                clientSocket.handshake.user = {
                    _id: authorisedUser._id,
                    firstName: authorisedUser.firstName,
                    lastName: authorisedUser.lastName,
                    socketID: clientSocket.id
                }
        
                next()
            }
            else
                console.error(new Error('Authentication error'))
        })
    })
    
    chatNamespace.on('connection', onConnection)
}

const mapUserIDToSocket = [], mapSocketIDToUser = []
const onConnection = clientSocket => {
    const { user } = clientSocket.handshake
    
    mapUserIDToSocket[user._id] = { 
        _id: user._id,
        socketID: user.socketID,
        firstName: user.firstName,
        lastName: user.lastName,
    }
    mapSocketIDToUser[user.socketID] = {
        _id: user._id,
        socketID: user.socketID,
        firstName: user.firstName,
        lastName: user.lastName,
    }

    clientSocket.on('disconnect', reason => {
        let user = mapSocketIDToUser[clientSocket.id]
        
        delete mapUserIDToSocket[user._id]
        delete mapSocketIDToUser[clientSocket.id]
    })

    clientSocket.on('msg', (msg, receiverID) => {
        var sender, receiver

        async.waterfall([
            (callback) => { // Checking if msg and receiver id are valid
                if(typeof msg === 'string' && typeof receiverID === 'string'){
                    sender = mapSocketIDToUser[clientSocket.id]
                    receiver = mapUserIDToSocket[receiverID]
                    callback(null)
                }
                else
                    callback('msg or receiverID isn\'t a string')
            },
            (callback) => {
                Conversation.find({ $or: [{ personID: sender._id, partnerID: receiverID }, { personID: receiverID, partnerID: sender._id }]}, (err, conversations) => {
                    callback(err, conversations)
                })
            },
            (conversations, callback) => {
                if(conversations.length){
                    Conversation.findByIdAndUpdate(
                        conversations[0]._id,
                        { $push: { content: { $each:[{ authorID: sender._id, msg }], $position: 0 }}},
                        err => {
                            callback(err)
                        }
                    )
                }
                else{
                    new Conversation({
                        personID: sender._id,
                        partnerID: receiverID,
                        content: [{ authorID: sender._id, msg }]
                    }).save((err, conversation) => {
                        User.update({ _id: sender._id }, { $push: { conversations: { partnerID: receiverID, conversationID: conversation._id }}}, err => {
                            if(!err){
                                User.update({ _id: receiverID }, { $push: { conversations: { partnerID: sender._id, conversationID: conversation._id }}}, err => {
                                    callback(err)
                                })
                            }
                            else
                                callback(err)
                        })
                    })
                }
            }
        ],
        (err) => {
            if(!err){
                if(receiver !== undefined){
                    delete sender['socketID']
                    clientSocket.to(receiver.socketID).emit('msg', msg, sender)
                }
            }
            else
                console.error(`Chat Socket Error: ${err}`)
        })
    })
    clientSocket.on('get-conversation', partnerID => {
        const userWhoRequired = mapSocketIDToUser[clientSocket.id]

        Conversation
            .find({ $or: [{ personID: userWhoRequired._id, partnerID: partnerID }, { personID: partnerID, partnerID: userWhoRequired._id }]})
            .select('content -_id -__v -personID -partnerID')
            .slice('content', 20)
            .exec((err, conversation) => {
                if(!err){
                    if(!conversation.length)
                        clientSocket.emit('get-conversation', [])
                    else if(conversation[0] !== undefined)
                        clientSocket.emit('get-conversation', conversation[0].content)
                }
                else
                    console.error(`Chat Socket Error: ${err}`)
            }
        )
    })
    clientSocket.on('typing', receiverID => {
        const receiver = mapUserIDToSocket[receiverID]

        if(receiver !== undefined){
            var sender = mapSocketIDToUser[clientSocket.id]
            delete sender.socketID
            clientSocket.to(receiver.socketID).emit('typing', sender)
        }
    })
}