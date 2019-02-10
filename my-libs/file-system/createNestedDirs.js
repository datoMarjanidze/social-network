const fs = require('fs')

/*
* Creates nested directories if it does not exists in the rootDir
* Params:
*   1. rootDir - absolute path from the file system's root dir,
*      to the dir where you want to build new nested dirs.
*   2. desiredPath - path that you want to create from the 
*      rootDir.
*   3. callback - executes after nested dirs are created and 
*      it's parameter is absolute, desired path.
**/

module.exports = (rootDir, desiredPath, callback) => {
    const splitedDesiredPath = desiredPath.split('/').filter(dirName => dirName !== '')
    var fullPath = rootDir

    splitedDesiredPath.forEach(dirName => {
        if(!fs.existsSync(`${fullPath}/${dirName}`))
            fs.mkdirSync(`${fullPath}/${dirName}`)
            fullPath = fullPath.concat(`/${dirName}`)
    })

    callback(fullPath)
}