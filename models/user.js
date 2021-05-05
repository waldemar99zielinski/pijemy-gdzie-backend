const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: String}, 

  facebookId: {
    type: String, 
  
    //TODO: ogarnij indexy
    //index: {unique: true}
  },
  googleId: {
    type: String, 
  
    //TODO: ogarnij indexy
    //index: {unique: true}
  },
  email: {
    type: String
  },
  favDiscounts: [{
    type: mongoose.Schema.Types.ObjectId
  }]

});

const User = mongoose.model("User", userSchema);

module.exports = User;

