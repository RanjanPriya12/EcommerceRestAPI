const Cart = require("../models/cart.model");

exports.addNewCartItem = async(req,res)=>{
    try {
        const newCartItem = Cart.create(req.body);
        return res.status(201).send({Success:true,newCartItem:newCartItem,message:"Your product is added successfully into cart."})
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}