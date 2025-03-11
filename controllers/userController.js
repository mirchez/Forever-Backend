import bcryp from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import slugify from "slugify";

//create JSON token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

//route for user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "User does not exist" });
    }

    const passwordMatch = await bcryp.compare(password, user.password);
    if (passwordMatch) {
      const token = createToken(user._id);
      return res.status(200).json({ success: true, token });
    } else {
      res.status(409).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//router for user Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //checking if user already exists
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist" });
    }
    //sanitezing username;
    const newName = slugify(name, "");
    const nameExist = await userModel.findOne({ name });
    if (nameExist) {
      res.status(400).json({ error: "Name already taken" });
      return;
    }
    //hashing user password
    const salt = await bcryp.genSalt(10); //times of salting
    const hashedPassword = await bcryp.hash(password, salt);

    const newUser = new userModel(req.body);
    newUser.password = hashedPassword;
    newUser.name = newName;

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

//route for amdmin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ error: "Not Valid Credentials", details: error.message });
  }
};
