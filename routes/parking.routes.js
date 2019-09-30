const express = require('express');
const cors = require('cors');
const router = express.Router();
const parking = require('../controllers/parking.controller');
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100'
];
// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
};
// Retrieve all menus
router.get('/', cors(corsOptions), parking.findAll);

// Retrieve a single menu with menuId
router.get('/:idUser', cors(corsOptions), parking.findOne);

// Create a new Menu
router.post('/', cors(corsOptions), parking.create);

// Update a Note with menuId
router.put('/:idUser', cors(corsOptions), parking.update);

// Delete a Note with menuId
router.delete('/:idUser', cors(corsOptions), parking.delete);

module.exports = router;
