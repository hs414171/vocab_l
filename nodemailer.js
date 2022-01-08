require("dotenv").config()
const nodemailer = require('nodemailer')
const os = require('os');

var transport = nodemailer.createTransport({    
    host: "mail.lltes.com",  
    secure: true,
    secureConnection: true, 
    
    port: 465,
    
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD 
    }
});
module.exports = transport