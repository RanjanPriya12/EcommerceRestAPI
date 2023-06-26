const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () =>{
    return mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true,
      });
}

module.exports = connectDB;