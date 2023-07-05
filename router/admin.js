const express = require('express');

const routers = express.Router();

const passport = require('passport');

const Admincontrollers = require('../controllers/Admincontrollers');

routers.get('/',Admincontrollers.index);
routers.get('/viewdata',Admincontrollers.viewdata);


module.exports = routers;