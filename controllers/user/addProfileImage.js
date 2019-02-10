const User = require('../../models/User')
const async = require('async')
const jwt = require('jsonwebtoken')
process.env.JWT_SECRET = 'Kb/1~;aB-0xxzaki//1U' // #TODO set JWT_SECRET in terminal environment
const formidable = require('formidable')
const createNestedDirs = require('../../my-libs/file-system').createNestedDirs
const fs = require('fs')
const jimp = require('jimp')

module.exports = (req, res) => {
    const form = new formidable.IncomingForm()
    
    form.parse(req, (err, fields, files) => {
        const { userID } = fields
        const usersDir = `${__dirname}/../../file-storage/users` // This directory must exist
        const userLargeImagePath = `/${userID}/images/profile/large` // This directory will dynamically build on usersDir
        const userSmallImagePath = `/${userID}/images/profile/small`
        var imageType = files.image.toJSON().type

        async.waterfall([
            (callback) => {
                jwt.verify(req.headers.jwtoken, process.env.JWT_SECRET, (err, user) => {
                    if(!err)
                        user._id === userID ? callback(null) : callback('callback-stop-condition')
                    else
                        callback(err)
                })
            },
            (callback) => {
                if(imageType.search('png') !== -1 || imageType.search('jpeg') !== -1)
                    callback(null)
                else
                    callback('callback-stop-condition')
            },
            (callback) => {
                createNestedDirs(usersDir, userLargeImagePath, fullPath => {
                    callback(null, fullPath)
                })
            },
            (fullPath, callback) => {
                const date = (new Date()).getTime()
                fs.renameSync(files.image.path, `${fullPath}/${date}.jpeg`)
                jimp.read(`${fullPath}/${date}.jpeg`)
                    .then(image => {
                        createNestedDirs(usersDir, userSmallImagePath, fullPath => {
                            callback(null, date, fullPath, image)
                        })
                    })
                    .catch(err => callback(err))
            },
            (date, fullPath, image, callback) => {
                image
                    .resize(jimp.AUTO, 200)
                    .quality(20)
                    .write(`${fullPath}/${date}.jpeg`, (err, image) => {
                        !err ? callback(null) : callback(err)
                    })
            }
        ],
        (err) => {
            if(!err)
                res.json({ uploaded: true })
            else if(err === 'callback-stop-condition')
                res.json({ uploaded: false })
            else{
                res.json({ uploaded: false})
                console.log(`Profile Image Upload Error: ${err}`)
            }

        })
    })
    form.on('error', err =>  {
        console.log(err)
    })
}