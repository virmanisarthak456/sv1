const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/users_controllers');
const usersPost = require('../controllers/post_controllers');
const usersLikes=require('../controllers/likes_controllers');
// we have to give different paths to different routes

router.get('/profile',usersControllers.profile);
router.get('/likes',usersLikes.likes);
router.get('/post',usersPost.post);


module.exports = router;


