const JWT = require('jsonwebtoken')

module.exports = (userId) =>{

    const expiresIn = '14d'

    const payload = {
      sub: userId,
      iat: Date.now()  
    }
    
    const token = JWT.sign(payload, process.env.JWT_SECRET, {expiresIn: expiresIn})
    console.log('signTokenJWT: \n' + userId)
    return (
       "Bearer " +token
    )
}