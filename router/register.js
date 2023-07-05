const express = require('express');

const routers = express.Router();

const Admincontrollers = require('../controllers/Admincontrollers');

routers.get('/',Admincontrollers.rdata);
routers.post('/insertdata',Admincontrollers.insertdata);

module.exports = routers;