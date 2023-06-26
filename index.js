const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const connectDB = require("./configs/db");
const path = require("path");
const cors=require('cors');
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
require("dotenv").config();
const port = 5000 || process.env.PORT;

app.get("/",(req,res)=>{
    return res.send(`<h2>Welcome to our Blog-Writing App</h2>`);
});

app.use("/api/myStore",userRoute);
cloudinary.config({ 
    cloud_name: 'dwaguis04', 
    api_key: '827958215438413', 
    api_secret: 'PyhGGlW8h2-jREsWQxHDA9Qrhb0' 
  });

app.listen(port,async(res,req)=>{
    try {
        await connectDB();
        console.log(`Server is lesting at port http://localhost:${port}`)
    } catch (error) {
        console.log("error",error);
    }
});