const express = require('express')

const placeController = require('../controllers/placeController')

const router = express.Router()

router
    .route('/')
    .post(placeController.postPlace)
    .get(placeController.getAllPlaces)

router
    .route('/:id')
    .get(placeController.getOnePlace)
    .patch(placeController.updatePlace)


module.exports = router