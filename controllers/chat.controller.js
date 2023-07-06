const Chat = require("../models/chat.model");


exports.accessChat = async(req,res)=>{
    try {
        const { userId } = req.body;
        if(!userId){
            return res.status(400).send({Success:false,message:"User id param not sent with request."});
        }
        let isChat = await Chat.find({
            isGroupChat:false,
            $and:[
                {
                    users:{$elemMatch:{$eq:req.user._id}}
                },
                {
                    users:{$elemMatch:{$eq:userId}}
                },
            ]
        }).populate("users","-password")
        .populate("latestMessage");

        isChat = await User.populate(isChat,{
            path:"latestMessage.sender",
            select :"first_name, last_name, email,avatar"
        });

        if(isChat.length>0){
            return res.status(200).send({Success:true,message:"Chat exists.",chat:isChat[0]});
        }else{
            let chatData = {
                chatName :"sender",
                isGroupChat:false,
                users:[req.user._id,userId]
            };

            try {
                const createChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({_id:createChat._id}).populate("users","-password");
                return res.status(200).send({Success:true,chat:fullChat});
            } catch (error) {
                return res.status(400).send({Success:false,error:error.message});
            }
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}