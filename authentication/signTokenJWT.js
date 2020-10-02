const JWT = require('jsonwebtoken')

module.exports = (userId) =>{

    const payload = {
      sub: userId,
      iat: Date.now()  
    }
    
    const token = JWT.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})
    console.log('signTokenJWT: \n' + userId)
    return (
       "Bearer " +token
    )
}