const mongoose = require("mongoose");

const addressShcema = new mongoose.Schema({
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

const Address = new mongoose.model('address',addressShcema);

module.exports = Address;