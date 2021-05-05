const Discount = require("../../models/discount")

module.exports = async (id) =>{
    
   
    if(typeof(id) != 'undefined'){

        const stringId = id.toString()
        
        const discount = await Discount.findById(stringId);

        if(discount){
            return stringId;
        }else{
            return false;
        }
    }else{
        return false;
    }
    
}