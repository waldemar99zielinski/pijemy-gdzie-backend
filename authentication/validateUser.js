const User = require("../models/user");

module.exports = async (_facebookId, _name, _birthday) => {

    const userToFind = await User.findOne({ facebookId: _facebookId });
    
    const userId = null
    //user signup, doesnt exist in database
    if (!userToFind) {
        //TODO: age validation
        console.log('validateUser: tworzymy nowego')
        const newUser = new User({
            name: _name,
            facebookId: _facebookId,
        })
        await newUser.save(function(err){
            if(err){
                return null
            }
        })

        return userId
        
    }else{
        console.log('validateUser: jestem w bazie')
        return userId
    }
};
