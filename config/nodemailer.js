const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');



let transporter = nodemailer.createTransport(env.smtp);
 

let renderTemplate = (data,realtivePath) =>{
    let mailHTML;
    ejs.renderFile(
        // reletivePath is from where this function is being called
        path.join(__dirname,'../views/mailers',realtivePath),
        data,
        function (err,template) {
            if (err) {
                console.log('err in rendering template',err);
                return;
                
            }
            mailHTML = template;
        
            
        }
    )
    return mailHTML;

}
module.exports= {
    transporter : transporter,
    renderTemplate: renderTemplate

}