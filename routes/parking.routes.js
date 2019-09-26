const express = require('express');
const router = express.Router();
const parking = require('../controllers/parking.controller');

// Retrieve all menus
router.get('/', parking.findAll);

// Retrieve a single menu with menuId
router.get('/:userId', parking.findOne);

// Create a new Menu
router.post('/', parking.create);

// Update a Note with menuId
router.put('/:userID', parking.update);

// Delete a Note with menuId
router.delete('/:userId', parking.delete);

module.exports = router;
