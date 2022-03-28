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
  link: { type: String, required: true },
  state: String,
  price: { type: Number, required: true },
  priceBySurface: Number,
  agencyPrice: Number,
  notaryFees: Number,
  district: String,
  address: String,
  lon: Number,
  lat: Number,
  surface: { type: Number, required: true },
  surfaceCarrez: Number,
  exterior: String,
  surfaceExterior: Number,
  exposition: String,
  visAVis: Boolean,
  floor: Number,
  floors: Number,
  dpe: String,
  ges: String,
  parking: Boolean,
  bikeParking: Boolean,
  annualCondominiumFees: Number,
  description: String,
  image: String,
  createdBy: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
  comments: [{
    text: String,
    author: String,
    date: {type:String, default: new Date()}
  }]
});

const Appart = mongoose.model('Appart', AppartSchema);

module.exports = { Appart };