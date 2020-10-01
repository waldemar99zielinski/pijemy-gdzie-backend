const express = require('express')

const discountController = require('../controllers/discoutController')
const discountReviewController = require('../controllers/discountReviewController')
const router = express.Router()

router
    .route('/')
    .get(discountController.getAllDiscounts)
router
    .route('/:id')
    .get(discountController.getOneDiscount)
router
    .route('/:id/review')
    .post(discountReviewController.review)
router
    .route('/')
    .post(discountController.postDiscount)

module.exports = router