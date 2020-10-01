const mongoose = require("mongoose");
const calculateRating = require('./functions/calculateRating')
const discountReviewSchema = new mongoose.Schema({
	

    rating: {
        type: Number,
        min: 0,
        max: 100,
        default:0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }

});

discountReviewSchema.methods.reviewDiscount = function(review) {
  
    if(review == 'like'){
        this.likes++
        this.rating = calculateRating(this.likes, this.dislikes)
        //this.save()
    }else if(review == 'dislike'){
        this.dislikes++
        this.rating = calculateRating(this.likes, this.dislikes)
    }else{
        console.log("discountRating model: reviewDiscount: wrong input: " + review)
    }

    return this
}

const DiscountReview = mongoose.model("DiscountReview", discountReviewSchema);

module.exports = DiscountReview;
