import { Router } from "express";
import { body } from "express-validator";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { handleInputErrors } from "../middleware/validation.js";

const productRouter = Router();

productRouter.post(
  "/add",
  // body("name").notEmpty().withMessage("Not a valid name"),
  // body("description").notEmpty().withMessage("Should have a description"),
  // body("price").isNumeric().withMessage("Should have a valid price"), // Corregido para validar números
  // body("bestseller").isBoolean().withMessage("Not a valid value"), // Asegúrate de que bestseller sea un booleano
  // body("category").notEmpty().withMessage("Not a valid category"),
  // body("subCategory").notEmpty().withMessage("Not a valid subCategory"),
  // body("sizes").notEmpty().withMessage("Not a valid size"),

  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  // handleInputErrors,
  addProduct
);

productRouter.post("/remove", removeProduct);

productRouter.post("/single", singleProduct);

productRouter.get("/list", listProducts);

export default productRouter;
