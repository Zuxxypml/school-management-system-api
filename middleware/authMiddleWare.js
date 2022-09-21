import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default auth;
