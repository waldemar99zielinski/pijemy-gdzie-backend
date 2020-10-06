const express = require('express')
const passportConfig = require('./passportConfig')
const validateUser = require('./validateAndReturnUser')
const signTokenJWT = require('./signTokenJWT')
const router = express.Router()
const authController = require('../controllers/authController')

router
    .route('/facebook')
    .get(passportConfig.FacebookAuthentication, authController.validateUserAndSignJWT)


router
    .route('/secret')
    .get(passportConfig.JWTAuthentication, (req, res, next)=>{
        console.log('authRouter: /secret: ' + req.user)
        res.status(200).json({
            status: 'secret',
            
        

        })

    })




module.exports = router