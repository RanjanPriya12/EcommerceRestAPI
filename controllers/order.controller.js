const Order = require("../models/order.model");


//create orders 
exports.createOrder = async(req,res)=>{
    try {
        const order = await Order.create(req.body);
        return res.status(201).send({Success:true,orderItems:order,message:"Your order created successfully."});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

//get all ordered items
exports.getOrderedItems = async(req,res)=>{
    try {
        const orderedItems = await Order.find({}).lean().exec();
        return res.status(200).send({Success:false,message:"Items fetched successfully.",orderedItems:orderedItems}); 
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}