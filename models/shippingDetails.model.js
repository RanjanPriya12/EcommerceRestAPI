const mongoose = require("mongoose");

const shippingShcema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: false },
    mobile: { type: Number, required: true },
    alternate_mobile: { type: Number, required: true },
    Lacal_address: { type: String, required: true },
    pincode: { type: Number, required: true },
    city:{type:String,required:true},
    district: { type: String, required: true },
    state: { type: String, required: true },
    addres_type:{type:String,required:false,enum:["Home","Office"]}
},{
    versionKey:false,
    timestamps:true
});

const ShippingDetails = new mongoose.model('shipping',shippingShcema);

module.exports = ShippingDetails;