import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Captain } from "../models/captain.model.js";
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
      return res.status(401).json({
        Message: "Unauthorized Request Blackist Token Get a new token ",
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
    // console.log("req.user", req.user)
    // console.log("req.user._id", req.user._id)
    next();
  } catch (error) {
    console.log("Error in JWT verification", error);
    return res.status(401).json({
      message: "Unauthorized Request Token",
      error,
    });
  }
};

export const authCaptain = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized Request" });
    }

    const isBlackList = await BlackListToken.findOne({ token: token });
    if (isBlackList) {
      return res.status(401).json({
        Message: "Unauthorized Request Blackist Token Get a new token ",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({
        message: "Invalid Access Token",
      });
    }

    req.captain = captain;
    console.log("req.captain", req.captain);
    next();
  } catch (error) {
    console.log("Error in JWT verification", error);
    return res.status(401).json({
      message: "Unauthorized Request Token",
      error,
    });
  }
};
