import { Router } from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
} from "../controllers/userController.js";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";

const userRouter = Router();
//we validate with middlewares
userRouter.post(
  "/register",
  body("email").isEmail().notEmpty().withMessage("Not a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Not valid password, 8 characters is needed"),
  body("name").notEmpty().withMessage("Name is required"),
  handleInputErrors,
  registerUser
);

userRouter.post(
  "/login",
  body("email").isEmail().notEmpty().withMessage("Not a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Not valid password, 8 characters is needed"),
  handleInputErrors,
  loginUser
);

userRouter.post(
  "/admin",
  body("email").isEmail().notEmpty().withMessage("Not a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Not valid password, 8 characters is needed"),
  handleInputErrors,
  adminLogin
);

export default userRouter;
