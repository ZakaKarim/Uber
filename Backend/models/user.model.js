import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

//Method to Generate a Token from JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      fullname: this.fullname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

//Method to Hash the password ya method video ma tha new to me
//THIS IS NOT RUN ON THE SAVE HOOK AUTOMATICALLY like the pre hook of mongoose
// userSchema.statics.hashPassword = async function (password) {
//   return await bcrypt.hash(password, 10);
// };

//This is the Pre Hook method to save the password in the database on save method only
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// //Method to compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
