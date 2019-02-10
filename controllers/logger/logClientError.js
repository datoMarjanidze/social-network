const fs = require('fs') 
const os = require('os')

module.exports = (req, res) => {
    let date = new Date()
    fs.appendFile(
        __dirname + '../../../logs/clientErrors.log',
        `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} `+
        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  `+
        `${req.body.msg}, { Url:${req.body.url}, LineNo:${req.body.lineNo}, `+
        `ColumnNo:${req.body.columnNo} } ${os.EOL}`,
        (err)=>{
            if(err !== null)
                console.log(err)
            else
                return res.end()
        }
    )

    return res.end()
}