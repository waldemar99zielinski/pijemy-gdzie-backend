module.exports = (likes, dislikes) => {
    let total  = likes + dislikes
    
       

    //return percentage of likes
    return (likes/total).toFixed(2)*100
    
}