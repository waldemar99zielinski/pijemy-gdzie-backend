const ErrorHandler = require('./../Errors&Logs/errorHandler')
const userReview = require('../models/userReview')

exports.getUserInfo = async (req, res, next) => {
	try{
		
		

	


		res.status(200).json({
			status: 'Success',
			
			user: req.user

		})

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}

exports.getUserReviews = async (req, res, next) => {
	try{
		const userId = req.user.id
        
        if(userId){
            const reviews = await userReview.find({userId: userId})
        
        	res.status(200).json({
                status: 'Success',
                
                reviews: reviews

		    })
        }

	


	

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}