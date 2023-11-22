const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, Unique: true, require },
  password: { type: String, require },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
