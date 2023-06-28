const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "customer",
    },
    avatar: {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

//incrept password
userSchema.pre("save", function (next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compareSync(password, this.password);
  } catch (error) {
    console.log("error",error)
  }
};

//reset password
// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//   return resetToken;
// };

const User = new mongoose.model("user", userSchema);
module.exports = User;
