const mongoose = require("mongoose");

const AppartSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength: 1,
    required:true
  },
  description: String,
  image: String,
  comments: [{ text: String, date: {type:String, default: new Date()} }]
});

const Appart = mongoose.model('Appart', AppartSchema);

module.exports = { Appart };