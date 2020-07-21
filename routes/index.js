const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');
console.log('router loaded');
router.get('/',homeController.home);

// this will give the path of users ie users_controllers

router.use('/users',require('./users')); 



//for any further routes , access from here
//router.use('./',require(''./routerfile));
// we will use the above syntax


module.exports = router;



