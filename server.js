const mongoose = require("mongoose");
const dotenv = require("dotenv");

const ErrorLogs = require('./Errors&Logs/errorLogs')

process.on('uncaughtException', err => {
    ErrorLogs(err.name, err.message)
  
    process.exit(1)
    
})

dotenv.config({ path: "./configuration.env" });

const app = require("./app");



mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"));

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port} `);
});

//handling all unhandledRejections
process.on('unhandledRejection', err => {
  ErrorLogs(err.name, err.message)
  
  server.close(() =>{
    process.exit(1)
  })
  
})

