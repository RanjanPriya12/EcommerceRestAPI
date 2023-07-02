const ShippingDetails = require("../models/address.model");

//create user address
const shippingDetails = async(req,res)=>{
    try {
        const address = await ShippingDetails.insert(req.body);
        return res.status(201).send({Success:true,address:address,message:"Your address created successfully."});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

const updateShippingDetails = async(req,res)=>{
    try {
        const address = await Address.findOne(req.params.id);
    } catch (error) {
        
    }
}