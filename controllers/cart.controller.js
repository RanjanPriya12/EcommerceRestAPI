const Cart = require("../models/cart.model");


// add new item to the cart
exports.addNewCartItem = async(req,res)=>{
    try {
        const newCartItem =await Cart.insertOne(req.body);
        return res.status(201).send({Success:true,newCartItem:newCartItem,message:"Your product is added successfully into cart."})
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

// get all cart items
exports.getCartItems = async(req,res)=>{
    try {
        const cartItems = await Cart.aggregate({$lookup:{ from:"product", localField:"userId", foreignField:"_id", as:"products"}});
        return res.status(200).send({Success:true,message:"Cart Items fetched Successfully.", cart:cartItems});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message}); 
    }
}

