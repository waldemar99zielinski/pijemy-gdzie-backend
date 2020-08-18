const express = require('express')

const discountController = require('../controllers/discoutController')

const router = express.Router()

router
    .route('/')
    .get(discountController.getAllDiscounts)

router
    .route('/:id')
    .get(discountController.getOneDiscount)



module.exports = router