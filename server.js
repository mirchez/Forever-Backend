import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudnirany from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudnirany();

//Middlewares
app.use(express.json());
app.use(cors());

//Api Endpoints
app.get("/", (req, res) => {
  res.status(200).json("api working");
});

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log("server started on: " + port);
});

export default app;
