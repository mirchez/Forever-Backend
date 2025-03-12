import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not authorized login again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: error.message });
  }
};

export default authUser;
