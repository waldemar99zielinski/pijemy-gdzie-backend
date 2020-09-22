const passport = require('passport')
const FacebookStrategy = require('passport-facebook')



passport.serializeUser((user, cb) =>{
    cb(null, user)
})

passport.deserializeUser((user, cb) =>{
    cb(null, user)
})

passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: "http://localhost:3000/api/v2/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'birthday']
},
    function(accessToken, refreshToken, profile, cb) {

       

        console.log(JSON.stringify(profile))
        user = {...profile}
        return cb(null, user)
        
    }
))

exports.FacebookAuthentication = passport.authenticate("facebook", { scope: [ 'user_birthday'] })
