const express = require('express');

const routers = express.Router();

const Admincontrollers = require('../controllers/Logincontrollers');

routers.get('/',Admincontrollers.index);

module.exports = routers;