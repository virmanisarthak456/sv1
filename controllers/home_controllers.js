const Post = require('../models/post');
const User = require('../models/user');
const Like = require('../models/like');



module.exports.home =async function(req,res){ 

     //To read the cookies 

    //console.log(req.cookies);

    //to the chamge the request from the server in response we will do this

    //res.cookie('user_id',25);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });

    // });

    
    try{
    // Populate the user of each post 

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path:'user'
        },
         populate: {
             path : 'likes'

         }
    }).populate('likes').populate('comments');

     

    
    let users=await User.find({});

    return res.render('home',{
        title: "codeial|home",
        posts : posts,
        all_users:users
    });

    //home is the actionName here where we are crearting a controller

    //return res.end('<h1> Express is up in codeial</h1?');

    // the above statement was sending it derectly to the browser
    
    // to render it home.ejs file we will do this 

    // return res.render('home',{
    //  title: "home"
    // });
    }
catch{
    console.log('Error',err);
    return ;
}


}