const express = require('express');
const path = require('path');

const app = express();

const port = 9856;

const passport = require('passport');
const passportLocal = require('./confing/passport-local-strategy');
const session = require('express-session');
const cookiePaeser = require('cookie-parser');

app.use(session({
    secret : "india",
    name : "program",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 1000*60*60*24
    } 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookiePaeser());
app.use(passport.setAuthenticated);

const db = require('./confing/moongose');
const { parseArgs } = require('util');

app.use(express.urlencoded());

app.use('/public',express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.use('/',require('./router'));

app.listen(port,(err)=>{
    if(err){
        console.log("Sever Is not Start");
        return false;
    }else{
        console.log("Sever Is Start In Port :- "+port);
    }
})