import { Router } from "express";

import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrder,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminauth.js";
import authUser from "../middleware/auth.js";

const orderRouter = Router();

//Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Payment Routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//User Route
orderRouter.post("/userorders", authUser, userOrder);

//Verify Payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
