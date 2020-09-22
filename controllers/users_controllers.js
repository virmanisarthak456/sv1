const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        if(err){
            console.log("error in  profile",err);
            return;
        }
        
        return res.render('users_profile',{
            title : "user's profile",
            profile_user: user
        });

    });
}
     
// for manual authentication we used cookies that is being commented out
    

    
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(user){
//                 return res.render('users_profile',{
//                     title:"User Profile",
//                     user: user
//                 });

//             }
//             return res.redirect('/users/sign-in');
            
//         });

//     }else{
//         return res.redirect('/users/sign-in');
//     }


module.exports.update = async function(req,res){
    if(req.user.id==req.params.id){
        try{
    let user =await User.findByIdAndUpdate(req.params.id);

        User.uploadAvatar(req,res,function(err){

            if(err){ console.log('****multer error: ',err)}

            console.log(req.file);

            user.name = req.body.name;

            if(req.file){
                if (user.avatar) {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                }
                //this is saving the path of the uploaded file into the avatar field in user 
                user.avatar = User.avatarPath + '/' + req.file.filename;
            }
            user.save();

            return res.redirect('back');

        });


}
catch(err){
    req.flash('err',err);
    return res.redirect('back');

}
}
else{
    return res.status(401).send('unauthorized');
}
}

// render the sign-up page

 module.exports.signUp = function(req,res){

     if(req.isAuthenticated()){
               return res.redirect('/users/profile');

       
     }

     return res.render('user_sign_up',{
     title:"Codeial | SignUp"
     });
 } 

module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
       }

    return res.render('user_sign_in',{
        title:"Codeial | SignIn"
    });
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){ console.log('Error in finding the user');
        return
    }
    if(!user){
        User.create(req.body,function(err,user){
            if(err){ console.log('Error in creating sign-up '); return}
            return res.redirect('/users/sign-in');
        });
    } else{
        return res.redirect('back');
    }
    });
}

module.exports.createSessions = function(req,res){

    //the below code was done manually now we are using passpoert 
    //   Therefore commenting the below code

    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){ console.log('User not found'); return}
    //     // handle user found
    //     if(user){
    //         // handle password which doesnt match
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         } 
    //         // handle session creation
    //         res.cookie('user_id',user.id)
    //             return res.redirect('/users/profile');
            


    //     }
        
    //     else{
    //         // handle user not found
    //         return res.redirect('back');


    //     }
    // });
    req.flash('success','logged in successfully');
    return res.redirect('/');
    
}
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','logged out successfully');

    return res.redirect('/');
}

