const router = require('express').Router()
const path = require('path')

router.use('/*', (req, res, next) => { // #TODO refactoring. Add regex in url instead Url.search('api')
    if(req.originalUrl.search('api') === 1)
        next()
    else
        res.sendFile(path.join(__dirname, '/../client/build/index.html'))
})
router.use(require('./logger')) // This route must be first to intercept requests
router.use('/api', require('./api'))

module.exports = router