//function for add product
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ success: false, error: error.message });
        }
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(200).json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

//function for update product
export const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // por cada slot: si llega archivo nuevo se sube a Cloudinary,
    // si no, se conserva la URL existente enviada en existingImageN
    const imagesUrl = [];
    for (let i = 1; i <= 4; i++) {
      const file = req.files?.[`image${i}`]?.[0];
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        imagesUrl.push(result.secure_url);
      } else if (req.body[`existingImage${i}`]) {
        imagesUrl.push(req.body[`existingImage${i}`]);
      }
    }

    const updateData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
    };
    if (imagesUrl.length > 0) {
      updateData.image = imagesUrl;
    }

    await productModel.findByIdAndUpdate(id, updateData);

    res.status(200).json({ success: true, message: "Product Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for list product
export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//function for removing product
export const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.body.id);

    if (!deletedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ success: false, message: error.message });
  }
};

//function for single product
export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ success: false, message: error.message });
  }
};
