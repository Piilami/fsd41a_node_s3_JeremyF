import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
