const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(400)
      .send({
        Success: false,
        message: "Authorization token not found or incorrect.",
      });
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res
      .status(400)
      .send({
        Success: false,
        message: "Authorization token not found or incorrect.",
      });
  }
  let decodeData;
  try {
    decodeData = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(400).send({ Success: false, error: error.message });
  }
  req.user = await User.findById(decodeData.id);
  next();
};

// exports.isAuthorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandle(
//           `Role: ${req.user.role} is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };