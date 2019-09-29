const mongoose = require('mongoose');

const ParkingSchema = mongoose.Schema(
  {
    idUser: Number,
    text: String,
    idParking: Number,
    location: GeoJSON.Point,

    isEnterParking: Boolean
  },
  {
    timestamps: true
  }
);
GeoJSON.Point = new mongoose.Schema({
  type: { type: String, default: 'Point' },
  coordinates: [{ type: 'Number' }]
});
/*The coordinates will be stored as an array in the format 
[longitude, latitude]. We index on location and let mongoDB know we are using a “2dsphere”. */
ParkingSchema.index({ location: '2dsphere' });
// ParkingSchema.index({ location: '2d' });
/* 
location: {
  type: "Point",
  coordinates: [36.098948, -112.110492]
  },
  */

const ParkingData = mongoose.model('parkings', ParkingSchema);
module.exports = ParkingData;
