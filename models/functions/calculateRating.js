module.exports = (likes, dislikes) => {
    console.log('calculateRating: ' + likes + ' ' + dislikes)
    let total  = likes + dislikes
    
    if(total== 0){
        return 0
    }

    //return percentage of likes
    return (likes/total).toFixed(2)*100
    
}