var express = require('express');

var router = express.Router();
var parking = require('./parking.routes');

router.use('/parking', parking);

module.exports = router;
