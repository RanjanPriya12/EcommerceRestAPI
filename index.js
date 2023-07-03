const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const connectDB = require("./configs/db");
const path = require("path");
const cors=require('cors');
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const wishListRoute = require("./routes/wishList.route");
const shippingRoute = require("./routes/shippingDetails.route");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
require("dotenv").config();
const port = 5000 || process.env.PORT;

app.get("/",(req,res)=>{
    return res.send(`<h2>Welcome to myStore online shopping site</h2>`);
});

app.use("/api/myStore",userRoute);
app.use("/api/myStore/products",productRoute);
app.use("/api/myStore/cart",cartRoute);
app.use("/api/myStore/order",orderRoute);
app.use("/api/myStore/shipping",shippingRoute);
app.use("/api/myStore/wishList",wishListRoute);

cloudinary.config({ 
    cloud_name: process.env.UPLOAD_CLOUD_NAME, 
    api_key: process.env.UPLOAD_API_KEY, 
    api_secret: process.env.UPLOAD_API_SECRET 
  });

app.listen(port,async(res,req)=>{
    try {
        await connectDB();
        console.log(`Server is lesting at port http://localhost:${port}`)
    } catch (error) {
        console.log("error",error);
    }
});