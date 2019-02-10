const router = require('express').Router()
const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment    

router.get(
    ['/api/search',
    '/api/users/friends'],
    (req, res, next) => {
        jwt.verify(req.headers.jwtoken, process.env.JWT_SECRET, (err)=>{
            if(!err)
                next()
            else
                res.json({ status: 'Unacceptable token' })
        })
    }
)
router.post(
    ['/api/users/friend',
    '/api/users/profile/images/profile'],
    (req, res, next) => {
        jwt.verify(req.headers.jwtoken, process.env.JWT_SECRET, (err)=>{
            if(!err)
                next()
            else
                res.json({ status: 'Unacceptable token' })
        })
    }
)



module.exports = router