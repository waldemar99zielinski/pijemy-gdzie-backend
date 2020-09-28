const Discount = require('./../models/discount')
const ErrorHandler = require('../Errors&Logs/errorHandler')
const getDayOfTheWeek = require('../functions/getDayOfTheWeek')
const validateCategoryParameters =require('./filterFuncions/validateCategoryParameters')
const validateAvailableParameter = require('./filterFuncions/validateAvailableParameter')

exports.getAllDiscounts = async (req, res, next) => {
	try{
		
		let discounts

		const categoryParameters = validateCategoryParameters(req.query.category)
		const onlyAvailableDiscounst = validateAvailableParameter(req.query.available)
		console.log('discountController: available: '+ onlyAvailableDiscounst)
		if(onlyAvailableDiscounst){
			discounts = await Discount.find({
				category: {$in : categoryParameters},
				avaliableDays: {$in: ['all',getDayOfTheWeek()]}
			}).populate({path: 'place', select: '-_id -__v'}).select('-__v')
		}else{
			discounts = await Discount.find({
				category: {$in : categoryParameters}
			}).populate({path: 'place', select: '-_id -__v'}).select('-__v')
		}

	


		res.status(200).json({
			status: 'Success',
			
			data: {
				discounts
			}

		})

	}catch(err){
		next(new ErrorHandler(err.message, 400))
	}
}



exports.getOneDiscount = async (req,res, next) => {
	try{
		const discountToFind = await  Discount.findById(req.params.id).populate({path: 'place', select: '-__v'}).select('-__v')

		if(!discountToFind){
			
			return next(new ErrorHandler('Object not found.', 404))
		}

		res.status(200).json({
			status: `Discount found successfully`,
			
			data: {
				discount: discountToFind
			}

		})
	}catch(err){
		const updatedDiscount = await Discount.find({
			avaliableDays: {$in: ['all',getDayOfTheWeek()]}
		})
		next(new ErrorHandler('Error', 404))
	}
} 

exports.postDiscount = async (req,res) =>{
	try{
		

		const postDiscount = await Discount.create(req.body)

		res.status(201).json({
			status: 'New discount successfully created',
			data: {
				discount: postDiscount	
			}
		})
	 	
	}catch(err) {
		res.status(400).json({
			status: 'Bad request',
			message: err
		})
	}
	
}

exports.updateDiscount = async (req, res) => {
	try{
		const updatedDiscount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: `Discount id: ${req.body.id}, name: ${req.body.name}, successfully updated`,
			
			data: {
				discount: updatedDiscount
			}

		})

	}catch(err){
		res.status(404).json({
			status: 'Error',
			message: err
		})
	}
}

exports.getAvailableDiscounts = async (req, res, next) => {
	try{
		
		
		const updatedDiscount = await Discount.find({
			avaliableDays: {$in: ['all',getDayOfTheWeek()]}
		})

		res.status(200).json({
			status: `Success`,
			
			data: {
				discount: updatedDiscount
			}

		})

	}catch(err){
		next(new ErrorHandler('Error', 400))
	}
}