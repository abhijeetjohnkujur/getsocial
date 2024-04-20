const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // Comment belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // Comment belong to a post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    // include the array's of ids of all comments in this post
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment