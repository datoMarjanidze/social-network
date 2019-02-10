const router = require('express').Router()

router.use(require('./isUserAuthorised'))

module.exports = router