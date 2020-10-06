const User = require("../models/user");
const ErrorHandler = require('../Errors&Logs/errorHandler')

module.exports = async (_facebookId, _name, _email) => {
    try {
        const userToFind = await User.findOne({ facebookId: _facebookId });

        //user signup, doesnt exist in database
        if (!userToFind) {
            //TODO: age validation
            console.log("validateUser: tworzymy nowego");
            const newUser = new User({
                name: _name,
                facebookId: _facebookId,
                email: _email,
            });
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
        next(new ErrorHandler('Error: validateAndReturnUser: '+error.message , 404))
    }
};
