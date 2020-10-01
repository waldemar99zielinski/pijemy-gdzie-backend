const { model } = require("../../models/discount")

//chceck weather given categories are compatible with the model
module.exports = (...categoryArray) => {
    const modelCategories = require('../../models/discountsCategories')
    
    
    const toComapre = categoryArray.toString().split(',')


   let intersection = toComapre.filter(category => { 
        if(modelCategories.includes(category)) return category
    })
    
    if(intersection.length === 0){
        intersection = modelCategories
    }
    //console.log('validateCategoryParameters: intersection: ' + intersection)

    return intersection
}