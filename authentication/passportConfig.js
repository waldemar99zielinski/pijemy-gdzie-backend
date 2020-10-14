const passport = require('passport')

const FacebookToken = require('passport-facebook-token')
const JWTStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const AnonymousStrategy = require('passport-anonymous').Strategy

const User = require('../models/user')
const ErrorHandler = require('../Errors&Logs/errorHandler')

passport.serializeUser((user, cb) =>{
    cb(null, user)
})

passport.deserializeUser((user, cb) =>{
    cb(null, user)
})

passport.use('facebookToken', new FacebookToken({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
},
    function(accessToken, refreshToken, profile, done) {
        try{
            
          done(null, profile)
        }catch(err){
            done(err, false, err.message)
        }
       
       
        
    }
))

//TODO: expiration doesnt work, not so important
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,

}, async (payload, done) => {
    //console.log('passportConfig: '+ JSON.stringify(payload))
    const user = await User.findById(payload.sub)
    if(user){
        return done(null, user)
    }else{
        //console.log("nie ma użytkownika :<")
        return done(null, false)
    }

}))

//for optional routes
passport.use(new AnonymousStrategy())


exports.FacebookAuthentication = passport.authenticate('facebookToken', { session: false})
exports.JWTAuthentication = passport.authenticate("jwt", {session: false})
exports.optionalAuthentication = passport.authenticate(['jwt', 'anonymous'], {session: false})