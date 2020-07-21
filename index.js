const express = require('express');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

// using layouts in this
app.use(expressLayouts);
//now accessing the static folders


// use express router(middle ware )

app.use('/',require('./routes/index')); 

// this will give a path of users in routes folder ie index.js of routes

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running in the port: ${port}`);
});