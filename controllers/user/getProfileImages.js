const fs = require('fs')
const async = require('async')

module.exports = (req, res) => {
    const { userID, size } = req.params
    var { page, itemsPerPage } = req.params
    const itemsPerPageLimit = {max: 10, min: 0}
    const usersDir = `${__dirname}/../../file-storage/users`
    const usersDirIDs = fs.readdirSync(usersDir)
    const userImageDir = `${usersDir}/${userID}/images/profile/${size}`

    async.waterfall([
        (callback) => {
            if(usersDirIDs.find(dirID => dirID === userID) !== 'undefined')
                callback(null)
            else
                callback('callback-stop-condition')
        },
        (callback) => {
            if(fs.existsSync(userImageDir))
                callback(null)
            else
                callback('callback-stop-condition')
        },
        (callback) => {
            var userImageNames = fs.readdirSync(userImageDir)
            if(userImageNames.length)
                callback(null, userImageNames)
            else
                callback('callback-stop-condition')
        },
        (userImageNames, callback) => {
            itemsPerPage >= itemsPerPageLimit['max'] || itemsPerPage <= itemsPerPageLimit['min'] ? callback('callback-stop-condition') : callback(null, userImageNames)
        },
        (userImageNames, callback) => {
            userImageNames.sort().reverse() // Newest image first

            // Creating 2 dimensional array of userImageNames
            const imageQuantity = userImageNames.length
            let rowQuantity
            if(Math.floor(imageQuantity % itemsPerPageLimit['max']) === 0)
                rowQuantity = Math.floor(imageQuantity / itemsPerPageLimit['max'])
            else
                rowQuantity = Math.floor(imageQuantity / itemsPerPageLimit['max']) + 1

            const sortedUserImageNames = []
            var columnQuantity
            for(let i = 0; i < rowQuantity; i++){
                columnQuantity = i === rowQuantity - 1 ? Math.floor(imageQuantity % itemsPerPageLimit['max']) : itemsPerPageLimit['max']
                sortedUserImageNames[i] = []

                for(let j = 0; j < columnQuantity; j++)
                    sortedUserImageNames[i][j] = userImageNames[i + j]
            }

            callback(null, sortedUserImageNames) // 0 index element is the biggest
        },
        (sortedUserImageNames, callback) => {
            const responseImages = []
            for(let i = 0; i < itemsPerPage; i++){
                const bitmap = fs.readFileSync(`${userImageDir}/${sortedUserImageNames[page][i]}`)
                responseImages[i] = new Buffer(bitmap).toString('base64')
            }
            
            callback(null, responseImages)
        }
    ],
    (err, images) => {
        if(!err)
            res.json({ images })
        else if(err === 'callback-stop-condition')
            res.json({ images: [] })
        else{
            res.json({ images: [] })
            console.error(`Get Profile Images Error: ${err}`)
        }
    })
} 