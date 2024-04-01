import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    // enum:['Male','Female','Others'],
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  domain: {
    type: String,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
