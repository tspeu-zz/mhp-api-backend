const mongoose = require('mongoose');

const ParkingSchema = mongoose.Schema(
  {
    idUser: Number,
    text: String,
    idParking: Number,
    location: {
      type: { type: String },
      coordinates: []
    },
    isEnterParking: Boolean
  },
  {
    timestamps: true
  }
);
/*The coordinates will be stored as an array in the format 
[longitude, latitude]. We index on location and let mongoDB know we are using a “2dsphere”. */
ParkingSchema.index({ location: '2dsphere' });
/* 
location: {
  type: "Point",
  coordinates: [36.098948, -112.110492]
  },
  */

const ParkingData = mongoose.model('Parking', ParkingSchema);
module.exports = ParkingData;
