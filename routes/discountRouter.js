const express = require('express')

const discountController = require('../controllers/discoutController')
const discountReviewController = require('../controllers/discountReviewController')
const router = express.Router()

const passportConfig = require('../authentication/passportConfig')

router
    .route('/')
    .get(discountController.getAllDiscounts)
router
    .route('/:id')
    .get(passportConfig.optionalAuthentication,discountController.getOneDiscount)
router
    .route('/:id/review')
    .post(passportConfig.JWTAuthentication,discountReviewController.review)

router
    .route('/')
    .post(discountController.postDiscount)

module.exports = router