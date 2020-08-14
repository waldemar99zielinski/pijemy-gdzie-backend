const Place = require('./../models/place')
const { Model } = require('mongoose')


exports.postPlace = async (req,res) =>{
	try{
		

		const newPlace = await Place.create(req.body)

		res.status(201).json({
			status: 'New place successfully created',
			data: {
				place: newPlace	
			}
		})
	 	
	}catch(err) {
		res.status(400).json({
			status: 'Bad request',
			message: err
		})
	}
	
}

exports.getAllPlaces = async (req, res) => {
	try{
		const places = await Place.find() 

		res.status(200).json({
			status: 'Success',
			
			data: {
				places
			}

		})

	}catch(err){
		res.status(400).json({
			status: 'Error',
			message: err
		})
	}
}

exports.updatePlace = async (req, res) => {
	try{
		const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: `Place id: ${req.body.id}, name: ${req.body.name}, successfully updated`,
			
			data: {
				place: updatedPlace
			}

		})

	}catch(err){
		res.status(404).json({
			status: 'Error',
			message: err
		})
	}
}

exports.getOnePlace = async (req,res) => {
	try{
		const placeToFind = await Place.findById(req.params.id)

		res.status(200).json({
			status: `Place found successfully`,
			
			data: {
				place: placeToFind
			}

		})
	}catch(err){
		res.status(404).json({
			status: 'Error',
			message: err
		})
	}
} 