const Admin = require('../models/Adminmodels');

module.exports.index = (req,res) =>{
    return res.render('index');
}

module.exports.rdata = (req,res)=>{
    return res.render('rdata');
}


module.exports.insertdata = (req,res) => {
   Admin.create({
        R_name : req.body.name,
        R_lname : req.body.lname,
        R_email : req.body.email,
        R_password : req.body.password
   },(err,data)=>{
    if(err){
        console.log("Cant Not Insertdata");
        return false;
    }
    console.log("Record Seccefully Inserted");
    return res.redirect('back');
   });
};

module.exports.viewdata = (req,res) =>{
    Admin.find({},(err,record)=>{
        if(err){
            console.log("Record Not Find");
            return false;
        }else{
            return res.render('view',{
                Data : record
            });
         }
    });
}
