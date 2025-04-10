import jwt from "jsonwebtoken";

//doctor authentication middlewares

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const Token = authHeader && authHeader.split(" ")[1];
    if (!Token) {
      return res.json({
        success: false,
        message: "not authorised login again",
      });
    }
    const tokenDecode = jwt.verify(Token, process.env.JWT_SECRET);

    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
