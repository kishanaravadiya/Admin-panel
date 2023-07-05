const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    R_name : {
        type : String,
        required : true
    },
    R_lname : {
        type : String,
        required : true
    },
    R_email : {
        type : String,
        required : true
    },
    R_password : {
        type : String,
        required : true
    }
});
 
const admin = mongoose.model('logintbl',AdminSchema);
module.exports = admin;