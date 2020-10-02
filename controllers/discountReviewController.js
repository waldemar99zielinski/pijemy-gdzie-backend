const DiscountReview = require('../models/discountReview')
const ErrorHandler = require('./../Errors&Logs/errorHandler')
const Discount = require('../models/discount')
const UserReview = require('../models/userReview')
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
		//find discount to be reviewed
		const discountToFind = await  Discount.findById(req.params.id)

		console.log('discountReviewController: discountId: '+  req.params.id)

		console.log('discountReviewController: user: '+  req.user)
		//if dicounst doesnt exist throw error
		if(!discountToFind){
			
			return next(new ErrorHandler('Wrong id', 404))
		}

		const reviewId = discountToFind.discountReview
		//check whether request contains review parameter (and validate it), if not throw error
		if(!req.body.review || (req.body.review != 'like' && req.body.review != 'dislike')){
			return next(new ErrorHandler('Wrong review parameters: ' +req.body.review , 404))
		}
		const review = req.body.review
		
		if(!req.user.id){
			return next(new ErrorHandler('No user id', 404))
		}
		const userId = req.user.id

		//find discountRevioew document
		const reviewToFind = await DiscountReview.findById(discountToFind.discountReview)
		if(!reviewToFind){
			return next(new ErrorHandler('discounts review error', 404))
		}
		
		//check whether user has already reviewd this discount
		let userReviewToFind = await UserReview.findOne({userId: userId, discountId: discountToFind.id}).exec()
		console.log('discountReviewController: userReviewToFind: ' +userReviewToFind)
		//user reviewing for the first time 
		let updatedReview = null
        if(!userReviewToFind){
			console.log('discountReviewController: user reviewing for the first time')
            reviewToFind.reviewDiscount(review)
			
			updatedReview = await DiscountReview.findByIdAndUpdate(reviewToFind.id, reviewToFind, {new: true})
			
			userReviewToFind = await UserReview.create({userId: userId, discountId: discountToFind.id, review: review})
			//create 


            //console.log(updatedReview)
            
		}
		//user has already reviewed this discount
		else{
			
			const oldReview = userReviewToFind.review
			//delete review
			if(oldReview == review){
				console.log('discountReviewController: delete review')
				reviewToFind.deleteReview(review)

				updatedReview = await DiscountReview.findByIdAndUpdate(reviewToFind.id, reviewToFind, {new: true})
				//deleting review relation between user and discount
				const userRev = await UserReview.findOneAndDelete({userId: userId, discountId: discountToFind.id})
				console.log('discountReviewController: discountReveiew: '+ updatedReview)

			}else{
				console.log('discountReviewController: changeReview')
				reviewToFind.changeReview(review)

				updatedReview = await DiscountReview.findByIdAndUpdate(reviewToFind.id, reviewToFind, {new: true})
				//deleting review relation between user and discount
				await UserReview.findOneAndUpdate({userId: userId, discountId: discountToFind.id}, {$set:{review: review}})
				console.log('discountReviewController: discountReveiew: '+ updatedReview)
			}
		}

		res.status(200).json({
					status: 'Success',
					data:{
						updatedReview
					}
				})

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}