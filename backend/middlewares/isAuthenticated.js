import jwt from "jsonwebtoken";
import { User } from "../modals/user.js";

const authenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.send({
      success: false,
      message: "Login first",
    });
  }
  const decode = jwt.verify(token, "!#$^%#$^&");
  const id = decode.userId;
  const user = await User.findById(id);
  if (!user) {
    res.send({
      success: false,
      message: "User not exist",
    });
  }
  req.user = user;
  next();
};

export { authenticated };
