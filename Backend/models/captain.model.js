import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name must be of 3 characters Long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name must be of 3 characters Long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Email must be of 3 characters"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [1, "Plate must be at least 1 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

//Method to Generate a Token from JWT
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fullname: this.fullname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

//This is the Pre Hook method to save the password in the database on the save method only
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Method to compare the password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Captain = mongoose.model("Captain", captainSchema);
