const Chat = require("../models/chat.model");
const User = require("../models/user.model");


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

exports.fetchCHats = async(req,res)=>{
    try {
        let chats = await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password")
        .populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt:-1});

        chats = await User.populate(chats,{
            path:"latestMessage.sender",
            select :"first_name, last_name, email,avatar"
        });

        return res.status(200).send({Success:true,chats:chats});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

exports.createGroupChat = async(req,res)=>{
    if(!req.body.users || !req.body.chatName){
        return res.status(200).send({message:"Please fill all the fields."});
    }

    let users = JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send({message:"More than two friends are required to form a group chat."})
    }
    users.push(req.user);
    try {
        const groupChat = await Chat.create({
            chatName:req.body.chatName,
            isGroupChat:true,
            users:users,
            groupAdmin:req.user
        });

        const fullGroupChat = await Chat.find({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password");
        return res.status(200).send({Success:true,groupChat:fullGroupChat});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

exports.renameGroup = async(req,res)=>{
    try {
        const { chatId, chatName } = req.body;
        const updatedChatName = await Chat.findByIdAndUpdate(chatId,{chatName},{new:true})
        .populate("users","-password").populate("groupAdmin","-password");
        if(!updatedChatName){
            return res.status(404).send({Success:false,message:"Chat not found."});
        }else{
            return res.status(200).send({Success:true,chat:updatedChatName});
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

exports.addToGroup = async(req,res)=>{
    try {
        const { userId, chatId } = req.body;
        const added = await Chat.findByIdAndUpdate(chatId,{
            $push:{users:userId}
        },{new:true}).populate("users","-password").populate("groupAdmin","-password");

        if(!added){
            return res.status(404).send({Success:false,message:"Chat not found."});
        }else{
            return res.status(200).send({Success:true,groupChat:added});
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}


exports.removeFromGroup = async(req,res)=>{
    try {
        const { userId, chatId } = req.body;
        const removed = await Chat.findByIdAndUpdate(chatId,{
            $pull:{users:userId}
        },{new:true}).populate("users","-password").populate("groupAdmin","-password");

        if(!removed){
            return res.status(404).send({Success:false,message:"Chat not found."});
        }else{
            return res.status(200).send({Success:true,groupChat:removed});
        }
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}