const User = require('../../models/User')
const async = require('async')

module.exports = (req, res) => {
    const reqParamsKeys = Object.keys(req.body)

    if(typeof reqParamsKeys !== 'undefined' && reqParamsKeys.length === 1 && 
        typeof req.body[reqParamsKeys] === 'string'){ // Request for single input validation
        const reqParamKey =  reqParamsKeys[0]
        const reqParamValue =  req.body[reqParamKey].toLowerCase()

        if(reqParamKey == 'email'){
            async.waterfall([
                (callback) => {
                    User.validateEmail(reqParamValue, (isValid)=>{
                        isValid ? callback(null) : callback('User Registration Error: Email is not valid')
                    })
                },
                (callback) => {
                    User.emailExists(reqParamValue, (err, exists)=>{
                        if(!err)
                            exists ? callback(null, 'Email already exists') : callback(null, '')
                        else
                            callback(err)
                    })
                }
            ], (err, status) => {
                if(!err)
                    res.json({ status })
                else{
                    res.status(500).send()
                    console.error(`User Registration Error: ${err}`)
                }
            })
        }
    }
    else if( // Request for all of the inputs' validation
        typeof reqParamsKeys !== 'undefined' && reqParamsKeys.length === 5 &&
        typeof req.body.firstName === 'string' && typeof req.body.lastName === 'string' &&
        typeof req.body.email === 'string' && typeof req.body.password === 'string' &&
        typeof req.body.confirmPassword === 'string'){

        const firstName = req.body.firstName.toLowerCase()
        const lastName = req.body.lastName.toLowerCase()
        const email = req.body.email.toLowerCase()
        const { password, confirmPassword } = req.body
        
        async.waterfall([
            (callback) => {
                User.validatefirstOrLastName(firstName, isValid => {
                    isValid ? callback(null) : callback('User Registration Error: firstname validation')
                })
            },
            (callback) => {
                User.validatefirstOrLastName(lastName, isValid => {
                    isValid ? callback(null) : callback('User Registration Error: lastname validation')
                })
            },
            (callback) => {
                User.validateEmail(email, isValid => {
                    isValid ? callback(null) : callback('User Registration Error: email validation')
                })
            },
            (callback) => {
                User.emailExists(email, (err, exists) => {
                    if(!err)
                        exists ? callback('User Registration Error: email already exists') : callback(null) 
                    else 
                        callback(err)
                })
            },
            (callback) => {
                User.validatePassword(password, confirmPassword, isValid => {
                    isValid ? callback(null) : callback('User Registration Error: password validation')
                })
            },
            (callback) => {
                User.encryptPassword(password, hash => {
                    hash ? callback(null, hash) : callback('User Registration Error: password encryption') 
                })
            },
            (hash, callback) => {
                const newUer = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash,
                    confirmPassword: confirmPassword
                })
                newUer.save((err, user) => {
                    callback(err, user)
                })
            },
            (user, callback) => {
                user ? callback(null, true, user._id) : callback('User Registration Error: user has not been created')
            }
        ],
        (err, created, userID)=>{
            if(!err)
                res.json({ created, userID })
            else{
                res.status(500).end()
                console.error(err)
            }
        })     
    }
}