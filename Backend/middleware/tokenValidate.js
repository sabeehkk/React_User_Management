import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const key = process.env.SECRECT_KEY;
    const decode = jwt.verify(token, key);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
}

export default verifyToken;
