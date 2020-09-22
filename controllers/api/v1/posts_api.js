const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    
        // Populate the user of each post 
    
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path:'user'
            }
        });
    
    return res.json(200,{
        message :"lists of posts",
        posts :posts
    });
}
module.exports.destroy = async function(req,res){
    try{
   let post= await Post.findById(req.params.id)
        // .id means converting the object id into the string
        console.log(req.xhr);
        if(post.user==req.user.id){
            post.remove();
             await Comment.deleteMany({post:req.params.id});          
          return res.json(200,{
              message:"Posts and its comments deleted successfully "

          });
            
            

        }else{
            return res.json(401,{
                message:"you can not delete this post"
            });
        }
    }catch(err){
        console.log('******',err);
       // req.flash('error',err);
        
       // return res.redirect('back');
       return res.json(500,{
           message: 'internal sever error'
       });

    }

    
}