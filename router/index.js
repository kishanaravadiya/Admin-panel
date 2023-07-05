const express = require('express');

const router = express.Router();

const passport = require('passport');

const Logincontroller = require('../controllers/Logincontrollers');
const { route } = require('./login');

router.use('/',require('./login'));
router.use('/register',require('./register'));
router.get('/forgetpassword',Logincontroller.forgetpassword);
router.post('/emaildata',Logincontroller.emaildata);
router.get('/otp',Logincontroller.otp);
router.post('/otpData',Logincontroller.otpData);
router.get('/newpass',Logincontroller.newpass);
router.post('/newpassData',Logincontroller.newpassData);
router.get('/profiles',passport.chekUserLogin,Logincontroller.profiles);
router.post('/update',passport.chekUserLogin,Logincontroller.update);
router.post('/logindata',passport.authenticate('local',{failureRedirect : '/'}),Logincontroller.logindata);
router.use('/admin',passport.chekUserLogin,require('./admin'));
router.get('/logout',Logincontroller.logout);


module.exports = router;