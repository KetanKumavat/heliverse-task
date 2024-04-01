import mongoose from "mongoose";
import userdetails from "./userDetail.js";
import User from "../models/users.js";

const seedDB = async () => {
  await User.deleteMany({});
  for (let i = 0; i < 1000; i++) {
    const userdata = new User({
      id: userdetails[i].id,
      firstname: userdetails[i].first_name,
      lastname: userdetails[i].last_name,
      email: userdetails[i].email,
      gender: userdetails[i].gender,
      avatar: userdetails[i].avatar,
      domain: userdetails[i].domain,
      available: userdetails[i].available,
    });
    await userdata.save();
  }
};

export default seedDB;
