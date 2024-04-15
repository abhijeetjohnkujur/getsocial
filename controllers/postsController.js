const Post = require('../models/post');

module.exports.create = (req,res) => {
    console.log("creating post")
    Post.create({
        content: req.body.content,
        user: req.user._id
    }
)
    .catch(err => res.status(400).json('Error:'+ err))

    return res.redirect('back');
}