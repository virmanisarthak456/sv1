 const fs = require('fs');
 const rfs = require('rotating-file-stream');
 const path = require('path');

 const logDirectory = path.join(__dirname,'../production_logs');
 fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);

 const accessLogStream = rfs.createStream('access.log',{
     interval: '1d',
     path:logDirectory

 });


const developmet = {
    name : 'development',
    asset_path : '/assets',
     session_cookie_key : 'something',
     db : 'Codeial_development',
    smtp : {
        service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'codeialdevelopment1@gmail.com',
        pass: 'sarthak123'
        },
        
       
    },
     google_client_id :"157224088980-lsulotdmb4neaollp1nmabu78t8oc0l6.apps.googleusercontent.com",
    google_client_secret: "57n7YdZsqyZXrMzAKuW7rsu6",
    google_call_back_url:"http://localhost:9000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan: {
        mode:'dev',
        options :{ stream : accessLogStream}

    }

 }
 
 const production = {
    name : 'production',
    
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE,
    db : process.env.CODEIAL_DB,
    smtp : {
        service : 'gmail',
        host : 'smtp.gamil.com',
        port : 587,
        secure : false,
        auth :{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_PASSWORD,
        },
        
       
    },
     google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLEINT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode:'combined',
        options :{ stream : accessLogStream}

    }
    
 }

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? developmet : eval(process.env.CODEIAL_ENVIRONMENT);
//module.exports = developmet;