const router = require('express').Router()
const loggerController = require('../../controllers/logger')

router.post('/logs/clientErrors', loggerController.logClientErrors)

module.exports = router