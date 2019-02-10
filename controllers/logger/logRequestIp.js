const fs = require('fs') 
const os = require('os')
const path = require('path')

module.exports = (req, res, next) => {
    let ip = req.connection.remoteAddress
    ip = ip.slice(ip.lastIndexOf(":")+1)
    let date = new Date()
    
    if(req.originalUrl.slice(1,7) !== 'assets'){
        fs.appendFile(
            path.join(__dirname, '/../../logs/requestIps.log'),
            `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} `+
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | `+
            `${req.originalUrl} | ${ip} ${os.EOL}`,
            err => {
                if(err) console.error(`Log Request Ip Error: ${err}`) 
            }
        )
    }

    next()
}