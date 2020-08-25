module.exports = (errorName, errorMessage, next) => {
    console.error(`${errorName}: ${errorMessage}`)
    next()
}