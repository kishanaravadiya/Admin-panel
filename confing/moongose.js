const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost/adminpanel');

const db = mongoose.connection;

db.on('error',console.error.bind(console,('DB is Not Start')));

db.once('open',(err)=>{
    if(err){
        console.log("DB is Not found");
        return false;
    }
    console.log("DB Succesfully Connetion");
})

module.exports = db;
