const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSessions =async function(req,res){
    try {
        let user = await User.findOne({email:req.body.email});
        if (!user||user.password!=req.body.password) {
            return res.json(422,{
                message:"invalid username or password"
            });
            
        }
        return res.json(200,{
            message:"Sign in successful,here is ut token plz keep it safe",
            data : {
                token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'10000'})
            }
        });

            
        
        
    } catch (error) {
        console.log('******',err);
        // req.flash('error',err);
         
        // return res.redirect('back');
        return res.json(500,{
            message: 'internal sever error'
        });
 
    }
}