const User = require('../../models/User')
const async = require('async')
const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment

module.exports = (req, res) => {
    const { jwtoken } = req.headers

    if(typeof jwtoken === 'string'){
        async.waterfall([
            (callback) => {
                jwt.verify(jwtoken, process.env.JWT_SECRET, (err, user)=>{
                    user !== 'undefined' ? callback(err, user) : callback(true, null)
                })
            },
            (user, callback) => {
                User.findById(user._id, (err, user) => {
                    user !== 'undefined' ? callback(err, user) : callback(true, null)
                })
            },
            (user, callback) => {
                var friends = []

                for(let i = 0; i < user.friends.length; i++){
                    User.findById(user.friends[i], '_id firstName lastName', (err, friend) => {
                        friends.push(friend)

                        if(i === user.friends.length - 1)
                            callback(err, friends)
                    })
                }
            }
        ],
        (err, friends)=>{
            if(!err)
                res.json({ friends })
            else{
                res.status(500).send()
                console.error(`Get Friends Error: ${err}`)
            }
        })
    }
}