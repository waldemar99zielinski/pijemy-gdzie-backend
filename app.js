const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
//routers
const placeRouter = require('./routes/placeRouter')
const discountRouter = require('./routes/discountRouter')
const descriptionRouter = require('./routes/descriptionRouter')

const app = express();

//cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
const apiRoute = '/api/v1'
app.use(`${apiRoute}/places`, placeRouter)
app.use(`${apiRoute}/discounts`, discountRouter)
app.use(`${apiRoute}/descriptions`, descriptionRouter)

module.exports = app;
