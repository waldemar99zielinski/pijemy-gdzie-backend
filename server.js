const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
