const express = require('express')

const discountController = require('../controllers/discoutController')

const router = express.Router()

router
    .route('/')
    .get(discountController.getAllDiscounts)



module.exports = router