const express = require('express')
const passportConfig = require('./passportConfig')
const validateUser = require('./validateUser')
const signTokenJWT = require('./signTokenJWT')
const router = express.Router()

router
    .route('/facebook')
    .get(passportConfig.FacebookAuthentication)
router
    .route('/facebook/callback')
    .get(passportConfig.FacebookAuthentication, (req, res)=>{
        try{
            const user = req.user

            if(user){
                const facebookId  = user.id
                const name = user.displayName
                const birthday = user._json.birthday

                const userId = validateUser(facebookId, name, birthday)

                res.status(200).json({
                    status: 'success',
                    token: signTokenJWT(userId)
                
        
                })
                

            }else{
                next(new ErrorHandler('Facebook auth callback error', 400))
            }
        }catch(err){
            next(new ErrorHandler('Facebook auth callback error', 400))
        }
    
    
    })
router
    .route('/secret')
    .get(passportConfig.JWTAuthentication, (req, res, next)=>{
        console.log('authRouter: /secret: ' + req.user)
        res.status(200).json({
            status: 'secret',
            
        

        })

    })




module.exports = router