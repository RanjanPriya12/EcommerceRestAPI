const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"product",
        required:true
    },
    qty:{type:Number,required:true,default:1},
},{
    timestamps:true,
    versionKey:false
});

const Cart = new mongoose.model("cart",cartSchema);
module.exports=Cart;