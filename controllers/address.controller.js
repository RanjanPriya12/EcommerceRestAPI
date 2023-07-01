const Address = require("../models/address.model");

//create user address
const userAddress = async(req,res)=>{
    try {
        const address = await Address.insert(req.body);
        return res.status(201).send({Success:true,address:address,message:"Your address created successfully."});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}