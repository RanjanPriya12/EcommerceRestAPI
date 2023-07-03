const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    productID:{type:mongoose.Schema.ObjectId,ref:"product",required:true},
    userId:{type:mongoose.Schema.ObjectId,ref:"user",required:true}
},{
    timestamps:true,
    versionKey:false
});

const WishList = new mongoose.model("wishList",wishListSchema);
module.exports=WishList;