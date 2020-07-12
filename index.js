const express = require('express');
const app = express();
const port = 9000;
app.listen(port,function(){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running in the port: ${port}`);
});