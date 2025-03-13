import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not JWT Login Again" });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated Login again" });
    }

    next();
  } catch (error) {
    error.message;
    res.status(409).json({ success: false, message: error.message });
  }
};

export default adminAuth;
