const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  role: {
    type: String,
    default: "reader"
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };