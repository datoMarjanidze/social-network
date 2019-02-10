const User = require('../models/User')
const async = require('async')

module.exports.findPerson = (req, res) => {
    var inputValueTMP = req.query.inputValue
    inputValueTMP = inputValueTMP.replace('%20', ' ')
    
    if(typeof inputValueTMP === 'string' && inputValueTMP !== ''){
        const inputValue = inputValueTMP.toLowerCase()
        const [firstName, lastName] = inputValue.split(' ')
        const page = parseInt(req.query.page)
        const itemsPerPage = parseInt(req.query.itemsPerPage)
        
        if(lastName !== undefined){
            async.waterfall([
                (callback) => {
                    User.validatefirstOrLastName(firstName, isValid => {
                        isValid ? callback(null) : callback('User Search Error: firstname is not valid')
                    })
                },
                (callback) => {
                    User.find({firstName, lastName}, '_id firstName lastName', {skip: page, limit: itemsPerPage}, (err, users) => {
                        callback(err, users)
                    })
                }
            ],
            (err, users)=>{
                if(!err)
                    res.json({ users })
                else{
                    res.status(500).end()
                    console.error(`User Search Error: ${err}`)
                }
            })
        }
        else{
            async.waterfall([
                (callback) => {
                    User.validatefirstOrLastName(firstName, isValid => {
                        isValid ? callback(null) : callback('User Search Error: firstname is not valid')
                    })
                },
                (callback) => {
                    User.find({firstName}, '_id firstName lastName', {skip: page, limit: itemsPerPage}, (err, users) => {
                        callback(err, users)
                    })
                }
            ],
            (err, users) => {
                if(!err)
                    res.json({ users })
                else{
                    res.status(500).end()
                    console.log(`User Search Error: ${err}`)
                }
            })
        }
    }
}