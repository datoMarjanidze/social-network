const User = require('../../models/User')
const async = require('async')
const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment

module.exports = (req, res) => {
    if(typeof req.body.jwToken === 'string'){
        jwt.verify(req.body.jwToken, process.env.JWT_SECRET, (err, user) => {
            if(!err){
                delete user.password
                delete user.email
                delete user.iat
                delete user.exp

                res.json({
                    expired: false,
                    user: user
                })
            }
            else
                res.json({ expired: true })
        })
    }
    else if(
        typeof req.body.email === 'string' && typeof req.body.password === 'string'){
            const email = req.body.email.toLowerCase()
            const password = req.body.password

            async.waterfall([
                (callback) => {
                    User.find({email: email}, '_id firstName lastName email password', (err, users) => {
                        callback(err, users)
                    })
                },
                (users, callback) => {
                    if(users.length)
                        User.comparePasswords(password, users[0].password, (err, match) => {
                            callback(err, match, users[0])
                        })
                    else
                        callback(null, false, null)
                },
                (match, user, callback) => {
                    let token
                    if(match)
                        token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: 9999})
                    else
                        token = ''
                    callback(null, token)
                }
            ],
            (err, token) => {
                if(!err)
                    res.json({ token })
                else{
                    res.status(500).end()
                    console.error(`User Login Error: ${err}`)
                }
            })
        }
}