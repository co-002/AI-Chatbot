import { User } from "../modals/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashPassword });
    await user.save();
    res.send({
      success: true,
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ userId: user._id }, "!#$^%#$^&", {
      expiresIn: "365d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      success: true,
      message: `Welcome ${user.name}`,
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.send({
    success: true,
    message: "User logged out"
  })
};

const singleUser = (req, res) => {
  
  res.send({
    success: true,
    user: req.user,
  });
};

export { register, login, singleUser, logout };
