const DiscountReview = require('../models/discountReview')
const ErrorHandler = require('./../Errors&Logs/errorHandler')
const Discount = require('../models/discount')

exports.create = async (req, res, next) => {
	try{
		
		const newDiscountReview = await DiscountReview.create({})

	


		res.status(200).json({
			status: 'Success',
			
			data: {
				newDiscountReview
			}

		})

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}
exports.getAll = async (req, res, next) => {
	try{
		
		const getall = await DiscountReview.find()

	


		res.status(200).json({
			status: 'Success',
			
			data: {
				getall
			}

		})

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}
exports.review = async (req, res, next) => {
	try{
		const discountToFind = await  Discount.findById(req.params.id)
	
		if(!discountToFind){
			
			return next(new ErrorHandler('Wrong id', 404))
		}

		const reviewId = discountToFind.discountReview

		if(!req.body.review){
			return next(new ErrorHandler('Wrong review parameters', 404))
		}

        const review = req.body.review
		const reviewToFind = await DiscountReview.findById(discountToFind.discountReview)
        
        if(reviewToFind){
            reviewToFind.reviewDiscount(review)
            const updatedReview = await DiscountReview.findByIdAndUpdate(reviewToFind.id, reviewToFind, {new: true})
            //console.log(updatedReview)
            res.status(200).json({
			    status: 'Success',
			
                data:{
                    updatedReview
                }
		    })
        }else{
            res.status(400).json({
			    status: 'fail',
			
			

		    })
        }

	

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}