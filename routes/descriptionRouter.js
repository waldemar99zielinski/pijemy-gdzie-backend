const express = require('express')

const descriptionController = require('../controllers/descriptionController')

const router = express.Router()

router
    .route('/')
    .post(descriptionController.postDescription)
    .get(descriptionController.getAllDescriptions)

router
    .route('/:id')
    .get(descriptionController.getOneDescription)
    .patch(descriptionController.updateDescription)


module.exports = router