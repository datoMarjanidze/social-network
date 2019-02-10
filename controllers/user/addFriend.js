const User = require('../../models/User')
const async = require('async')
const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment

module.exports = (req, res) => {
    const { personID } = req.body
    const { jwtoken } = req.headers
    var myID
    if(typeof personID === 'string' && typeof jwtoken === 'string'){
        async.waterfall([
            (callback) => {
                jwt.verify(jwtoken, process.env.JWT_SECRET, (err, user)=>{
                    if(!err && user !== 'undefined'){
                        myID = user._id
                        callback(null, user)
                    }
                    else{
                        console.error(err)
                        callback(err, null)
                        res.json({
                            status: '!ok'
                        })
                    }
                })
            },
            (data = null, callback) => {
                User.findOne({_id: personID}, (err, user) => {
                    if(!err)
                        callback(null, null)
                    else{
                        consloe.error(err)
                        callback(err, null)
                        res.json({
                            status: '!ok'
                        })
                    }
                })
            },
            (data = null, callback) => {
                User.findByIdAndUpdate(myID, {$addToSet: {friends: personID}}, (err, doc) => {
                    if(!err)
                        callback(null, sucess = true)
                    else{
                        consloe.error(err)
                        callback(err, null)
                        res.json({
                            status: '!ok'
                        })
                    }
                })
            }
        ],
        (err, sucess) => {
            if(sucess)
                res.json({
                    status: 'ok'
                })
            else{
                console.error(err)
                res.json({
                    status: '!ok'
                })
            }
        })
    }
    else{
        res.json({
            status: '!ok'
        })
    }
}