const router = require('express').Router()
const loggerController = require('../controllers/logger')

router.all('/*', loggerController.logRequestIp)

module.exports = router