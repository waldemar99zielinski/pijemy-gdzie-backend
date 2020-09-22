const express = require('express')

const passportConfig = require('./passportConfig')

const router = express.Router()

router
    .route('/facebook')
    .get(passportConfig.FacebookAuthentication)
router
    .route('/facebook/callback')
    .get(passportConfig.FacebookAuthentication, (req, res)=>{
        console.log(req.user)
        res.status(200).json({
			status: 'callback',
			
		

		})
    })



module.exports = router