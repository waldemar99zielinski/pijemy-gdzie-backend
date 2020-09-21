module.exports = () => {
    let date = new Date()
    
    let day = date.getDay()
    

    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    const today = days[day]
    

    return day
}