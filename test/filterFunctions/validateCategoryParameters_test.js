const validateCategoryParameters = require('../../controllers/filterFuncions/validateCategoryParameters')

let assert = require('assert')

const allCategories = ['Beer', 'Vodka','Wine', 'Drinks', 'Other']

describe('validateCategoryParameters', () =>{
    describe('all available categories', ()=>{
        
        it('should return the same array', ()=>{
            assert.strictEqual(validateCategoryParameters(allCategories).toString, allCategories.toString)
        })
    })
    describe('given random parameters', ()=>{
        const randomParameters = ['random1', 'random2', 'random3','random4', 'random5', 'random6' ]

        it('should return all categories', ()=>{
            assert.strictEqual(validateCategoryParameters(randomParameters).toString, allCategories.toString)
        })
    })
    describe('given no parameters', ()=>{
        it('should return all categories', ()=>{
            assert.strictEqual(validateCategoryParameters().toString, allCategories.toString)
        })
    
    })
    describe('given only wine', ()=>{
        const onlyWine = ['Wine']
        it('should return wine', ()=>{
            assert.strictEqual(validateCategoryParameters(onlyWine).toString, onlyWine.toString)
        })
    
    })
    describe('given only Wine&Beer', ()=>{
        const wineAndBeer = ['Wine', 'Beer']
        it('should return wine and beer', ()=>{
            assert.strictEqual(validateCategoryParameters(wineAndBeer).toString, wineAndBeer.toString)
        })
    
    })
    describe('given only Wine&Beer and 2 random', ()=>{
        const wineAndBeer = ['Wine', 'Beer']
        const wineAndBeerAnd2Random = ['Wine', 'Beer', 'Random1', 'Random2']
        it('should return wine and beer', ()=>{
            assert.strictEqual(validateCategoryParameters(wineAndBeerAnd2Random).toString, wineAndBeer.toString)
        })
    
    })

})