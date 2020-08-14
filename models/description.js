const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
    
    descriptionLong: {
        type: String,
       

    },
    startsAt: {
        type: Date,
        min: '2020-01-01'
    },
    endsAt: {
        type: Date
      
    }
	
    //TODO photo
});

const Description = mongoose.model("Description", descriptionSchema);

module.exports = Description;
