module.exports.post = function(req,res){
    // return res.end('<h1> users posts are here</h1>');
    return res.render('post',{
        title:"Post"
    });
}