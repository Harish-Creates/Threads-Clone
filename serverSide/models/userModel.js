const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLenght: 8 },
  profilePic: { type: String, default: "" },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  bio: { type: String,default:"" },

},{
    timestamps: true
});

const User = mongoose.model('User',userSchema)

module.exports={
    User
}
