const express = require("express");
const app = express();
const userRoute = require("./routes/user.route");
const connectDB = require("./configs/db");
app.use(express.json());
require("dotenv").config();
const port = 5000 || process.env.PORT;

app.use("/api/myStore",userRoute)

app.listen(port,async(res,req)=>{
    try {
        await connectDB();
        console.log(`Server is lesting at port http://localhost:${port}`)
    } catch (error) {
        console.log("error",error);
    }
});