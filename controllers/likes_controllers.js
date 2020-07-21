module.exports.likes=function(req,res){
    // return res.end('<h1> likes is shown here</h1>');
    return res.render('likes',{
        title:"users_likes"
    });
}