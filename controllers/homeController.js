const Post = require('../models/post');

module.exports.home = function (req, res) {

    Post.find()
        .populate('user')
        .then((posts) => {
            return res.render('home', {
                title: "Social up | Home",
                posts: posts
            });
        })
        .catch((err) => {
            console.log(err);
            return res.redirect('back');
        });
}