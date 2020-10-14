const express = require('express')
const passportConfig = require('../authentication/passportConfig')
const userController = require('../controllers/userController')


const router = express.Router()

router
    .route('/')
    .get(passportConfig.JWTAuthentication, userController.getUserInfo)

router
    .route('/reviews')
    .get(passportConfig.JWTAuthentication, userController.getUserReviews)

module.exports = router