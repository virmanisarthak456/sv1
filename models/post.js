const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content :{
        type: String,
        required: true
    }, // since we are linking it to the users 
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // include array of ids of this post schema
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'


        }
    ],
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},


{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;