const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controllers');
console.log('router loaded');
router.get('/',homeController.home);

// this will give the path of users ie users_controllers

router.use('/users',require('./users')); 
// path for the posts 
router.use('/posts',require('./posts'));
//path for the comments
router.use('/comments',require('./comments'));
// path for likes 
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));



//for any further routes , access from here
//router.use('./',require(''./routerfile));
// we will use the above syntax


module.exports = router;



