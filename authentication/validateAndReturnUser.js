const User = require("../models/user");
const ErrorHandler = require('../Errors&Logs/errorHandler')

module.exports = async (_provider,_id, _name, _email) => {
    try {
        let userToFind = null;

        if(_provider == 'google'){
            console.log("validateUser: google")
            userToFind = await User.findOne({ googleId: _id });
        }else if(_provider == 'facebook'){
            console.log("validateUser: facebook")
            userToFind = await User.findOne({ facebookId: _id });
        }
      
        console.log("validateUser: email: "+ _email);
        //user signup, doesnt exist in database
        if (!userToFind) {
            //TODO: age validation
           
            let newUser;
            if(_provider == 'google'){
                console.log("validateUser: tworzymy nowego google");
                newUser = new User({
                    name: _name,
                    googleId: _id,
                    email: _email,
                });
            }else if(_provider == 'facebook'){
                console.log("validateUser: tworzymy nowego facebook");
                newUser = new User({
                    name: _name,
                    facebookId: _id,
                    email: _email,
                });
            }
           
            await newUser.save(function (err) {
                if (err) {
                    return null;
                }
            });

            return newUser;
        } else {
            console.log("validateUser: jestem w bazie");
            return userToFind;
        }
    }catch(error){
        new ErrorHandler('Error: validateAndReturnUser: '+error.message , 404)
    }
};
