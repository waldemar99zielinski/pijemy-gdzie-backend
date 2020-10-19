const ErrorHandler = require('./../Errors&Logs/errorHandler')
const userReview = require('../models/userReview')
const Discount = require('../models/discount')

const isDiscountIdValid = require('./validationFunctions/isDiscountIdValid')
const isInputValid = require('./validationFunctions/isInputValid')
const User = require('../models/user')

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


exports.addUserFavDiscount = async (req, res, next) => {
	try{
		const userId = req.user.id.toString()

		

		const discountId = req.body.discountId

		const user = await User.findById(userId)

		const id = await isDiscountIdValid(discountId)
		
        if(user && id){
			
			user.favDiscounts.addToSet(id)

			await user.save()

        	res.status(200).json({
                status: 'Success',
                
                favDiscounts: user.favDiscounts

		    })
        }else{
			next(new ErrorHandler("Bad request", 400))
		}
	

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}

exports.getUserFavDiscounts = async (req, res, next) => {
	try{
		const userId = req.user.id.toString()


		const user = await User.findById(userId)

		
		
        if(user){
			
			

        	res.status(200).json({
                status: 'Success',
        
                favDiscounts: user.favDiscounts

		    })
        }else{
			next(new ErrorHandler("Bad request", 400))
		}
	

	}catch(err){
		next(new ErrorHandler(err.message, 500))
	}
}

exports.deleteUserFavDiscount = async (req, res, next) => {
	try{
		const userId = req.user.id.toString()

		const discountId = req.body.discountId

		const user = await User.findById(userId)

		
		
        if(user && isInputValid(discountId, 'string')){
			
			user.favDiscounts.pull(discountId)

        	res.status(200).json({
                status: 'Success',
				message: `Discount id: ${discountId} removed form user's favourties`,
                favDiscounts: user.favDiscounts

		    })
        }else{
			next(new ErrorHandler("Bad request", 400))
		}
	

	}catch(err){
		next(new ErrorHandler(err.message, 500))
	}
}
