const Description = require('./../models/description')
const { Model } = require('mongoose')


exports.postDescription = async (req,res) =>{
	try{
		

		const postDescription = await Description.create(req.body)

		res.status(201).json({
			status: 'New descritpion successfully created',
			data: {
				description: postDescription	
			}
		})
	 	
	}catch(err) {
		res.status(400).json({
			status: 'Bad request',
			message: err
		})
	}
	
}

exports.getAllDescriptions = async (req, res) => {
	try{
		const descriptions = await Description.find().populate('place') 

		res.status(200).json({
			status: 'Success',
			
			data: {
				descriptions
			}

		})

	}catch(err){
		res.status(400).json({
			status: 'Error',
			message: err
		})
	}
}

exports.updateDescription = async (req, res) => {
	try{
		const updatedDescription = await Description.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: `Descritpion id: ${req.body.id}, name: ${req.body.name}, successfully updated`,
			
			data: {
				description: updatedDescription
			}

		})

	}catch(err){
		res.status(404).json({
			status: 'Error',
			message: err
		})
	}
}

exports.getOneDescription = async (req,res) => {
	try{
		const descriptionToFind = await Description.findById(req.params.id).populate('place')

		res.status(200).json({
			status: `Descritpion found successfully`,
			
			data: {
				description: descriptionToFind
			}

		})
	}catch(err){
		res.status(404).json({
			status: 'Error',
			message: err
		})
	}
} 