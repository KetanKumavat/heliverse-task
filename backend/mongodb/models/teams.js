import mongoose from "mongoose";

const teamSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  members: [
    {
      type: Object,
      require: true,
    },
  ],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
