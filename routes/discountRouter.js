const express = require('express')

const discountController = require('../controllers/discoutController')

const router = express.Router()

router
    .route('/')
    .post(discountController.postDiscount)
    .get(discountController.getAllDiscounts)

router
    .route('/:id')
    .get(discountController.getOneDiscount)
    .patch(discountController.postDiscount)


module.exports = router