const Admin = require('../models/Adminmodels');

const nodemailer  = require('nodemailer');

module.exports.index = (req,res)=>{
    if(!res.locals.user){
        return res.render('login');
    }
    return res.redirect('/admin');
}

module.exports.logindata = (req,res) => {
    return res.redirect('/admin');
}


module.exports.logout = (req,res) =>{
    req.logout((err)=>{
        if(err){
            console.log("Something Wrong Logout");
            return false;
        }
        return res.redirect('/');
    });
}

module.exports.forgetpassword = (req,res) =>{
    return res.render('forgetpassword');
}

module.exports.emaildata = (req,res) =>{
    let email = req.body.email;

    Admin.findOne({R_email : email},(err,userdata)=>{
        if(err){
            console.log("Email Not Found");
            return false;
        }
        let otp = Math.floor(Math.random()*1000000);
        let transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: "kishanaravadiya6820@gmail.com",
            pass: "qpjinlahoehrpozd"
            }
      });

        let mailoption = {
            form : "ruangadmin5577@gmail.com",
            to : email,
            subject : "Nice Nodemailer Test",
            html : '<h1>Verification Code</h1> <br> <h3>Please use the verification code below to Forget Password in.</h3> <br> <h2>'+otp+'</h2> <br> <h4>If you did not request this, you can ignore this email.</h4>', 
        };
        transport.sendMail(mailoption,(err,info)=>{
            if(err){
                return console.log(err);
            }
            res.cookie('userotp',{
                email : email,
                otp : otp
            });
            console.log("Successfully OTP Send");
            return res.redirect('/otp');
        })
    });
}

module.exports.otp = (req,res) =>{
    return res.render('otp');
}

module.exports.otpData = (req,res) =>{
    if(req.cookies.userotp.otp == req.body.otp)
    {
        return res.redirect('/newpass');
    }else{
        console.log("Otp Not Match");
        return res.redirect('back');
    }
}
 module.exports.newpass = (req,res) =>{
    return res.render('newpass');
 }

 module.exports.newpassData = (req,res) =>{
    let newpass = req.body.newpass;
    let cpass = req.body.cpass;
    if(newpass == cpass)
    {
        let email = req.cookies.userotp.email;
        console.log(req.body);

        Admin.findOneAndUpdate({R_email : email},{
            R_password : newpass
        },(err,data)=>{
            if(err){
                console.log("Something Is Wrong");
                return false;
            }else{
                res.clearCookie('userotp');
                console.log('Password Successfully Changed');
                return res.redirect('/');
            }
        });
    }else{
        console.log("NewPassword And Confirmpassword not Match");
        return res.redirect('back');
    }
 }


 module.exports.profiles = (req,res) =>{
    let userdata = res.locals.user;
    return res.render('profiles',{
        userdata : userdata
    });
 }

 module.exports.update = (req,res) =>{
    let profiled = req.body.profiled;
    
    Admin.findByIdAndUpdate(profiled,{
        R_name : req.body.first_name,
        R_lname :req.body.last_name,
        R_email : req.body.email,
        R_password : req.body.password
    },(err,userdata)=>{
        if(err){
            console.log("Profiles Not Upadate");
            return false;
        }else{
            console.log("Profiles is successfully Upadate");
            return res.redirect('/admin');
        }
    });
 }
