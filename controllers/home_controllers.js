module.exports.home =function(req,res){ //home is the actionName here where we are crearting a controller
    //return res.end('<h1> Express is up in codeial</h1?');

    // the above statement was sending it derectly to the browser
    
    // to render it home.ejs file we will do this 

    return res.render('home',{
     title: "home"
    });
}