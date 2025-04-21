import mongoose from "mongoose";
import bcrypt from "bcrypt";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    match: [/^\d{9,15}$/, "Please enter a valid phone number"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (v) {
        return passwordRegex.test(v);
      },
      message:
        "Password must be at least 8 characters long and include at least one letter and one number"
    }
  },
  role: {
    type: String,
    enum: ["admin", "user"], // <-- שינוי כאן
    default: "user"
  }
}, {
  timestamps: true
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
