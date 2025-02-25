import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    work: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(user.password, salt);

    user.password = hashedPwd;
    next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("user", userSchema);
