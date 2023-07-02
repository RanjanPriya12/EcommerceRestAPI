const ShippingDetails = require("../models/address.model");

//create customer shipping info
exports.shippingInfo = async(req,res)=>{
    try {
        const address = await ShippingDetails.insert(req.body);
        return res.status(201).send({Success:true,address:address,message:"Your address created successfully."});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

//update shipping info
exports.updateShippingInfo = async(req,res)=>{
    try {
        const detail = await ShippingDetails.findOne(req.params.id);
        if(!detail){
            return res.status(404).send({Success:false,message:"Shipping info or Address not found."})
        }else{
            await ShippingDetails.findByIdAndUpdate(req.params.id,req.body,{new:true});
            return res.status(200).send({Success:true,message:"Your shipping info is updated successfully."});
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

//delete or remove shipping info
exports.deleteShippingInfo = async(req,res)=>{
    try {
        const detail = await ShippingDetails.findOne(req.params.id);
        if(!detail){
            return res.status(404).send({Success:false,message:"Shipping info or Address not found."})
        }else{
            await detail.remove();
            return res.status(200).send({Success:true,message:"Your shipping info is deleted successfully."});
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}