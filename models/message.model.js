const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    content:{type:String,required:true,trim:true},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"chat",required:true},
},{
    timestamps:true,
    versionKey:false
});

const Message = new mongoose.model("message",messageSchema);
module.exports=Chat;