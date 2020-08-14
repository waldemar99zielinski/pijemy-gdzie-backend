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
    descriptionShort: {
        type: String,
    },
    descriptionLong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Description'
       

    },
    price: {
        type: Number,
        min: 0
        
    },
    
    //TODO: rating




});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
