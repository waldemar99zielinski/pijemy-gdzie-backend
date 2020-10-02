const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const JWTStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
const User = require('../models/user')

passport.serializeUser((user, cb) =>{
    cb(null, user)
})

passport.deserializeUser((user, cb) =>{
    cb(null, user)
})

passport.use( new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET_KEY,
    callbackURL: "/api/v2/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'birthday']
},
    function(accessToken, refreshToken, profile, cb) {

       
        
        //console.log('passportCongif: user: '+ JSON.stringify(user))
        return cb(null, profile)
        
    }
))
//TODO: expiration doesnt work, not so important
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    ignoreExpiration: false,

}, async (payload, done) => {
    console.log('passportConfig: '+ JSON.stringify(payload))
    const user = await User.findOne(payload.sub)
    if(user){
        return done(null, user)
    }else{
        console.log("nie ma użytkownika :<")
        return done(null, false)
    }

}))

//TODO: failure login callback
exports.FacebookAuthentication = passport.authenticate("facebook", { scope: [ 'user_birthday'], failureRedirect: '/fail_login' })
exports.JWTAuthentication = passport.authenticate("jwt", {session: false})