module.exports.signup = (req,res) => {
    return res.render('signup',{
        title: "Sign Up Page"
    })
}

module.exports.signin = (req,res) => {
    return res.render('signin',{
        title: "Sign In Page"
    })
}