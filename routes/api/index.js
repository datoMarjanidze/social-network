const router = require('express').Router()

router.use(require('./users'))
router.use(require('./search'))
router.use(require('./logger'))

module.exports = router