import jwt from "jsonwebtoken";

//doctor authentication middlewares

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const dToken = authHeader && authHeader.split(" ")[1];
    if (!dToken) {
      return res.json({
        success: false,
        message: "not authorised login again",
      });
    }
    const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);

    req.body.docId = tokenDecode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
