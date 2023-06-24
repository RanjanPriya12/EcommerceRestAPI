const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please Enter Your First Name"],
        maxLength: [15, "first name cannot exceed 15 characters"],
        minLength: [3, "first name is too small"],
      },
      last_name: {
        type: String,
        required: [true, "Please Enter Your First Name"],
        maxLength: [15, "last name cannot exceed 15 characters"],
        minLength: [5, "last name is too small"],
      },
      email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Sorry Email is Not Valid"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
      },
      role: {
        type: String,
        default: "student",
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
},{
    versionKey:false,
    timestamps:false
});

const User = new mongoose.model('user',userSchema);
module.exports= User;