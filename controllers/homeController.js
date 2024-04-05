

module.exports.home = function (req, res) {
    console.log(req.cookies);
    res.cookie('name','sachin');
    res.cookie('age', 23);
    res.cookie('user_id','1');
    return res.render('home', {
        title: "Home"
    });
}