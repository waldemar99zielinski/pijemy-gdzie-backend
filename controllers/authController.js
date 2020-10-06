const validateAndReturnUser = require('../authentication/validateAndReturnUser')
const SignTokenJWT = require('../authentication/signTokenJWT')
const ErrorHandler = require('../Errors&Logs/errorHandler')

exports.validateUserAndSignJWT = async (req, res, next)=> {
    try{
        console.log('authRouter: /fb auth: ' + JSON.stringify(req.user))
        if(req.user){
            const facebookId  = req.user.id
            const name = req.user.displayName
            const email = req.user.email

            const user = await validateAndReturnUser(facebookId, name, email)

            res.status(200).json({
                status: 'Success',
                token: SignTokenJWT(user.id),
                user: user            
            })
            
        }
            
    }catch(error){
        next(new ErrorHandler('Error: authController: validateUserAndSignJWT: '+error.message , 404))
    }
    
}