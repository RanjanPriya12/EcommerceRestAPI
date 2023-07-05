const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chatName :{ type:String,required:true},
    isGroupChat : {type:Boolean,default:false},
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    latestMessage :{
        type:mongoose.Schema.Types.ObjectId,ref:"message"
    },
    gruopAdmin:{
        type:mongoose.Schema.Types.ObjectId,ref:"user"
    }
},{
    timestamps:true,
    versionKey:false
});

const Chat = new mongoose.model("chat",chatSchema);
module.exports=Chat;