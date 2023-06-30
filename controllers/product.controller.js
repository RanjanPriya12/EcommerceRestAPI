const Product = require("../models/products.model");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/API_Feature");

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
    return res.status(400).send({ Success: false, error: error.message });
  }
};

//get all products by customers
exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 16;
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .rangeFilter()
      .categoryFilter()
      .subCategoryFilter()
      .colorFilter()
      .brandFilter()
      .sorting()
      .pagination(resultPerPage);
    const products = await apiFeature.query;
    const productCount = products.length;
    const totalPages = Math.ceil(productCount / resultPerPage);
    return res.status(200).send({
      Success: true,
      message: "Products fetched successfully.",
      products,
      productCount,
      resultPerPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send({ Success: false, error: error.message });
  }
};

// get all products by admin
exports.getProductsByAdmin = async (req, res) => {
  try {
    const products = await Product.find().lean().exec();
    return res
      .status(200)
      .send({
        Success: true,
        message: "Products fetched successfully.",
        products: products,
      });
  } catch (error) {
    return res.status(500).send({ Success: false, error: error.message });
  }
};

//update product by admin
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .send({
        Success: false,
        message: "Something went wrong, product not found.",
      });
  }
  // images cloudinary
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
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
  }

  product = await Product.updateOne(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res
    .status(200)
    .send({ success: true, product, message: "Product updated successfully." });
};
