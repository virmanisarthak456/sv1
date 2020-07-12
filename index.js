const express = require('express');
const app = express();
const port = 9000;

// use express router(middle ware )
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running in the port: ${port}`);
});