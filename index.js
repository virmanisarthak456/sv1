const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser');
const app = express();
require('./config/view-helpers')(app); 


const port = 9000;
const expressLayouts = require('express-ejs-layouts');



// connecting to the database now 
const db = require('./config/mongoose');
const { urlencoded } = require('express');

// importing libraries 

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// here we have connected the mongo with the session so that we can get rid of the session expire problem 
// whenever we restart the server

const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const { Console } = require('console');

// set up the chat server to be used with socket.io
const chatServer = require('http').Server(app); // this app is declared in line4 (express app)
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');
if (env.name=='development') {
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),        
        debug: true,
        outputStyle: 'extended',
        prefix:'/css'
    }));
}





app.use(urlencoded({extended : false}));
app.use(cookieParser());

//now accessing the static folders
app.use(express.static(path.join(__dirname,env.asset_path)));

//path for the profile picture to be shown OR making the uploads path available to the browser
app.use('/uploads',express.static(__dirname+ '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

// using layouts in this
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session in the db

app.use(session({
    name: 'codeial',
    //Todo cahnge the scret before deployment in the production mode
    secret: env.session_cookie_key,
    saveUninitialized: 'false',
    resave : 'false',
    cookie:{
        maxAge:(1000*60*100)
    },
     store : new MongoStore({
        
             mongooseConnection: db,
             autoRemove:'disabled'
        

     },function(err){
         console.log(err || 'connect mongodb ok');
     })

    
    
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// we will use it after session , bcz it requires session cookies
app.use(flash());
// now using the middleware which we have created
app.use(customMware.setFlash);

// use express router(middle ware )

 app.use('/',require('./routes/index')); 
 
 // this will give a path of users in routes folder ie index.js of routes



app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running in the port: ${port}`);
});