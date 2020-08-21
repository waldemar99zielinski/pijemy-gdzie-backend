const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
	
	title: {
        type: String,
        required: [true, 'Discount must have a title']
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: [true, 'Discount must have a place :o']

    },
    category: {
        type: String,
        enum: ['Beer', 'Vodka','Wine', 'Drinks', 'Other']
        
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        min: 0
        
    },
    avaliableDays: [String]
    
    //TODO: rating




});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
