const express = require('express');
const router = express.Router();
const parking = require('../controllers/parking.controller');

// Retrieve all menus
router.get('/', parking.findAll);

// Retrieve a single menu with menuId
router.get('/:idUser', parking.findOne);

// Create a new Menu
router.post('/', parking.create);

// Update a Note with menuId
router.put('/:idUser', parking.update);

// Delete a Note with menuId
router.delete('/:idUser', parking.delete);

module.exports = router;
