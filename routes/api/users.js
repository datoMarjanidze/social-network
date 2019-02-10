const router = require('express').Router()
const userController = require('../../controllers/user')

router.post('/users', userController.createUser)
router.post('/users/login', userController.loginUser)
router.post('/users/friend', userController.addFriend)
router.get('/users/friends', userController.getFriends)
router.post('/users/profile/images/profile', userController.addProfileImage)
router.get('/users/:userID/profile/images/profile/:size/:page/:itemsPerPage', userController.getProfileImages)

module.exports = router