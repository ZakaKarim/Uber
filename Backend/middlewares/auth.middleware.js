import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { BlackListToken } from "../models/blacklistToken.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }

    const isBlackList = await BlackListToken.findOne({ token: token });
    if (isBlackList) {
      return res
        .status(401)
        .json({
          Message: "Unauthorized Request Blackkist Token Get a new token ",
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid Access Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in JWT verification", error);
    return res.status(401).json({
      message: "Unauthorized Request Token",
      error,
    });
  }
};
