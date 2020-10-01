const express = require('express')

const discountReviewController = require('../controllers/discountReviewController')

const router = express.Router()

router
    .route('/')
    .get(discountReviewController.getAll)
router
    .route('/')
    .post(discountReviewController.create)
router
    .route('/:id')
    .post(discountReviewController.review)
module.exports = router