const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
//routers
const placeRouter = require('./routes/placeRouter')
const discountRouter = require('./routes/discountRouter')
const descriptionRouter = require('./routes/descriptionRouter')

//errors
const ErrorHandler = require('./Errors&Logs/errorHandler')
const errorController = require('./Errors&Logs/errorController')
const app = express();

app.use(helmet())

const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Number of requests has expired, try again later.'
})
app.use('/api', limiter)


//cors
app.use(cors())
app.use(express.json({ limit: '100kb'}))
app.use(express.urlencoded({extended: true}))

//SECURITY: data sanitize: NOSQL query injection
app.use(mongoSanitize())
//SECURITY: data sanitize: XSS, clean malicious code
app.use(xss())
//SECURITY: data sanitize: parameter polution
app.use(hpp({
    whitelist: [
        
    ]
}))
//routes
const apiRoute = '/api/v1'
//app.use(`${apiRoute}/places`, placeRouter)
app.use(`${apiRoute}/discounts`, discountRouter)
//app.use(`${apiRoute}/descriptions`, descriptionRouter)


app.all('*', (req, res, next)=>{
   

    next(new ErrorHandler(`Invalid path: ${req.originalUrl}`, 404))
})

app.use(errorController)

module.exports = app;
