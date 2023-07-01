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

//update cart item [size,qty]
exports.updateCartItem = async(req,res)=>{
    try {
        const id = req.params.id;
        let cartItem = await Cart.findOne({_id:id});
        if(!cartItem){
            return res.status(400).send({Success:false, message:"Cart item does not exists."});
        }else{
            let size = req.body.size,qty=req.body.qty;
            if(size && qty){
                cartItem = await Cart.updateOne({_id:req.params.id},{$set:{size:size,qty:qty}});
            }else if(size!=="" && qty===""){
                cartItem = await Cart.updateOne({_id:req.params.id},{$set:{size:size}});
            }else if(size==="" && qty !==""){
                cartItem = await Cart.updateOne({_id:req.params.id},{$set:{qty:qty}});
            }
            return res.status(200).send({Success:true, message:"Cart item updated successfully.",cartItem:cartItem});
        }
    } catch (error) {
        return res.status(500).send({Success:false, error:error.message});
    }
}

//delete item from cart
exports.delteCartItem = async(req,res)=>{
    try {
        const item = await Cart.findOne({_id:req.params.id});
        if(!item){
            return res.status(404).send({Success:false,message:"Cart item is not found."});
        }else{
           await item.remove();
           return res.status(200).send({Success:true,message:"Cart item deleted successfully."});
        }
    } catch (error) {
        return res.status(500).ssend({Success:false,error:error.message});
    }
}

