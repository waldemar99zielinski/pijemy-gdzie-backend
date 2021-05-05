module.exports = (input, inputType) =>{
    
   console.log(typeof(input))
    if(typeof(input) == inputType){

        return true;
    }else{
        return false;
    }
    
}