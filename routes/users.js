const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersControllers = require('../controllers/users_controllers');
//const usersPost = require('../controllers/post_controllers');
//const usersLikes=require('../controllers/likes_controllers');


// we have to give different paths to different routes

router.get('/profile/:id', passport.checkAuthentication,usersControllers.profile);
router.post('/update/:id', passport.checkAuthentication,usersControllers.update);



//router.get('/likes',usersLikes.likes);
//router.get('/post',usersPost.post);

router.get('/sign-up',usersControllers.signUp);

router.get('/sign-in',usersControllers.signIn);

router.post('/create',usersControllers.create);

// use passport as a middleware to authenticate 
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
) ,usersControllers.createSessions);


router.get('/sign-out',usersControllers.destroySession);
router.get('/auth/google',passport.authenticate('google',{ scope:['profile','email'] } ));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersControllers.createSessions);

module.exports = router;


