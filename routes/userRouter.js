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


router
    .route('/fav')
    .post(passportConfig.JWTAuthentication, userController.addUserFavDiscount)
    .get(passportConfig.JWTAuthentication, userController.getUserFavDiscounts)
    .delete(passportConfig.JWTAuthentication, userController.deleteUserFavDiscount)
module.exports = router