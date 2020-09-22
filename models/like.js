const moongose = require('mongoose');

const likeschema = new moongose.Schema({
    user : {
        type: moongose.Schema.ObjectId

    },
    //this defines the object id of the liked object
    likeable : {
        type : moongose.Schema.ObjectId,
        required: true,
        refpath : 'onModel'
    },
    // this field is used for defining the type of the likeable object since this is dynamic refrence
    onModel : {
        type: String,
        required : true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true
});
const Like = moongose.model('Like',likeschema);
module.exports = Like;