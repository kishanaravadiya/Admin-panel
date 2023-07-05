const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const Admin = require('../models/Adminmodels');

passport.use(new passportLocal({
    usernameField : "email"
},(email,passport,done)=>{
    Admin.findOne({R_email : email},(err,user)=>{
        if(err){
            console.log("Something Wrong");
            return done(null,false);
        }
        if(!user || user.R_password != passport)
        {
            console.log("Email And Password Not Match");
            return done(null,false);
        }
        return done(null,user);
    });
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    Admin.findById(id,(err,user)=>{
        if(err){
            console.log("Something Wrong");
            return done(null,false);
        }
        return done(null,user);
    });
});

passport.chekUserLogin =(req,res,next) =>{
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;