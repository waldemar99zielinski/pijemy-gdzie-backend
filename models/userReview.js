const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },

    discountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',

    },
    review: {
        type: String,
        enum: ['like', 'dislike']
    }
        

});

const UserReview = mongoose.model("UserReview", userReviewSchema);

module.exports = UserReview;

