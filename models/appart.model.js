const mongoose = require("mongoose");

const AppartSchema = new mongoose.Schema({
  code: {
    type:String,
    default: function() {
      const now = new Date();
      const yyyy = now.getFullYear();
      let mm = now.getMonth() + 1, dd = now.getDate();
      if (dd < 10) dd = `0${dd}`;
      if (mm < 10) mm = `0${mm}`;
      const HH = now.getHours();
      const MM = now.getMinutes();
      const clearedName = this.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

      return `${dd}${mm}${yyyy}-${HH}${MM}-${clearedName}`;
    }
  },
  name: {
    type: String,
    minlength: 1,
    required: true
  },
  price: { type: Number, required: true },
  state: { type: String, required: true },
  description: String,
  image: String,
  comments: [{ text: String, date: {type:String, default: new Date()} }]
});

const Appart = mongoose.model('Appart', AppartSchema);

module.exports = { Appart };