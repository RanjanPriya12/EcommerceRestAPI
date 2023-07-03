const WishList = require("../models/wishlist.model");

// add product into wishlist
exports.addWishListProduct = async(req,res)=>{
    try {
        const wishListItem = await WishList.insertOne(req.body);
        return res.status(201).send({Success:true,message:"You have successfully added product into wishlist.",wishListItem});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}

//get all wishList products
exports.getAllWishListItems = async(req,res)=>{
    try {
        const wishListItems = await WishList.find({}).lean().exec();
        return res.status(200).send({Success:true,message:"Items fetched successfully.", wishListItems});
    } catch (error) {
        return res.status(500).send({Success:false,error:error.message});
    }
}