const Discount = require('./../models/discount')
const { Model } = require('mongoose')
const ErrorHandler = require('../Errors&Logs/errorHandler')

exports.getAllDiscounts = async (req, res) => {
	try{
		const discounts = await Discount.find().populate({path: 'place', select: '-googleReference'}) 

		res.status(200).json({
			status: 'Success',
			
			data: {
				discounts
			}

		})

	}catch(err){
		next(new ErrorHandler('Error', 400))
	}
}



exports.getOneDiscount = async (req,res, next) => {
	try{
		const discountToFind = await  Discount.findById(req.params.id).populate('place').populate('descriptionLong')

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