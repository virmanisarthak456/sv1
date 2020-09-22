const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Authentication using Passport
passport.use( new LocalStrategy({
    usernameField: 'email',// getting it from the schema which is declared in users in models folder
    passReqToCallback : true // this allows us to set the 1st argument as req in the below func so that we can add flash mssgs
},
function(req,email,password,done){
    // Finding a user and establish identity
    User.findOne({email:email},function(err,user){
       if(err){
           req.flash('error',err);
           return done(err);
       }
       if(!user||user.password!=password){
           req.flash('error','Invalid Username/Password');
           return done(null,false);
       }
       return done(null,user);
    });

}
));

// sereializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});
//de serialize the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding the user-->passport');
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated or not the below function is a middle ware

passport.checkAuthentication = function(req,res,next){
    // if the user is signed in then pass on the request to the next function(controller's Action)
    if(req.isAuthenticated()){
        return next();

    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

// creating the function to check if the user is signed in or not  this is also a middleware
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){

        // req.user contains the current signed in user from the session cookie and we are just sending it to the locals 
        // for the views
        res.locals.user = req.user;
    }
      next();
}


module.exports = passport;