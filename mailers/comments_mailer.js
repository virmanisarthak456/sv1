const nodeMailer = require('../config/nodemailer');
// this is another way of exporting a method
exports.newComment = (comment)=> {

console.log('inside newComment mailer',comment);
                                               //data           // relative path 
let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

nodeMailer.transporter.sendMail({
    from: "codeialdevelopment1@gmail.com",
    to : comment.user.email,
    subject: "New comment published!",
    html:htmlString


},(err,info)=>{
    if (err) {
        console.log('err in sending mail',err);
        return;
        
    }
    console.log('Message sent',info);
    return ;

});

}