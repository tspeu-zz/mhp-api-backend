const Parking = require('../models/parking.model.js');

// create new Menu
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: 'Data content can not be empty'
    });
  }

  const pakingMenu = new Parking({
    idUser: req.body.idUser,
    text: req.body.text,
    idParking: req.body.isParking,
    location: {
      type: { type: String },
      coordinates: [36.098948, -112.110492]
    },
    isEnterParking: Boolean
  });

  // Save Menu in the database
  pakingMenu
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Something wrong while creating the parking data.'
      });
    });
};

// Retrieve all menu from the database.
exports.findAll = (req, res) => {
  Parking.find()
    .then(p => {
      res.send(p);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Something wrong while retrieving parking data.'
      });
    });
};

// Find a single menu with a menu
exports.findOne = (req, res) => {
  Parking.findById(req.params.userId)
    .then(p => {
      if (!p) {
        return res.status(404).send({
          message: 'menu not found with id ' + req.params.userId
        });
      }
      res.send(menu);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'menu not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Something wrong retrieving user with id ' + req.params.userId
      });
    });
};

// Update a menu
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'User data content can not be empty'
    });
  }

  // Find and update product with the request body
  Parking.findByIdAndUpdate(
    req.params.userId,
    {
      idUser: req.body.idUser,
      text: req.body.text || '',
      idParking: req.body.isParking,
      location: {
        type: { type: 'Point' },
        type: { type: String },
        coordinates: [req.bodylat, req.body.lng]
        //lat: -34.397, lng: 150.644
      },
      isEnterParking: Boolean || true
    },
    { new: true }
  )
    .then(p => {
      if (!p) {
        return res.status(404).send({
          message: 'Data User not found with id ' + req.params.userId
        });
      }
      res.send(p);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'ParkingData item not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message:
          'Something wrong updating parkingData item with id ' +
          req.params.userId
      });
    });
};

// Delete a menu with the specified userId in the request
exports.delete = (req, res) => {
  Parking.findByIdAndRemove(req.params.userId)
    .then(p => {
      if (!p) {
        return res.status(404).send({
          message: 'Menu item not found with id ' + req.params.userId
        });
      }
      res.send({ message: ' item deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: ' item not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Could not delete  item with id ' + req.params.userId
      });
    });
};
