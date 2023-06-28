const Product = require("../models/products.model");
const cloudinary = require("cloudinary");

//create product
exports.createProduct = async (req, res) => {
  try {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    return res.status(201).send({
      success: true,
      product: product,
    });
  } catch (error) {
    return res.status(400).send({Success:false, error:error.message});
  }
};

//get all products
exports.getAllProducts = async(req,res)=>{
  try {
    const products = await Product.find({}).lean().exec();
    return res.status(200).send({Success:true,message:"Products fetched successfully.", products:products});
  } catch (error) {
    return res.status(500).send({Success:false, error:error.message});
  }
}
