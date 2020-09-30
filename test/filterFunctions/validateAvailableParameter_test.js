const validateAvailableParameters = require('../../controllers/filterFuncions/validateAvailableParameter')

let assert = require('assert')



describe('validateAvailableParameters', () =>{
    describe('given true as a string', ()=>{
        
        it('should return true ', ()=>{
            assert.strictEqual(validateAvailableParameters('true'), true)
        })
    })
    describe('given random string', ()=>{
        
        it('should return false', ()=>{
             assert.strictEqual(validateAvailableParameters('radom'), false)
        })
    })
    describe('given random int', ()=>{
        
        it('should return false', ()=>{
             assert.strictEqual(validateAvailableParameters(15), false)
        })
    })
    describe('given random array', ()=>{
        const randomArray = ['true', 7, 'mao']
        it('should return false', ()=>{
             assert.strictEqual(validateAvailableParameters(randomArray), false)
        })
    })
  

})