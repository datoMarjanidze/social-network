const router = require('express').Router()
const searchController = require('../../controllers/search')

router.get('/search', searchController.findPerson)

module.exports = router