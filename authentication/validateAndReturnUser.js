const User = require("../models/user");
const ErrorHandler = require("../Errors&Logs/errorHandler");

module.exports = async (_provider, _id, _name, _email) => {
  try {
    let userToFind = null;

    if (_provider == "google") {
      userToFind = await User.findOne({ googleId: _id });
    } else if (_provider == "facebook") {
      userToFind = await User.findOne({ facebookId: _id });
    }

    //user signup, doesnt exist in database
    if (!userToFind) {
      //TODO: age validation

      let newUser;
      if (_provider == "google") {
        newUser = new User({
          name: _name,
          googleId: _id,
          email: _email,
        });
      } else if (_provider == "facebook") {
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
      return userToFind;
    }
  } catch (error) {
    new ErrorHandler("Error: validateAndReturnUser: " + error.message, 404);
  }
};
