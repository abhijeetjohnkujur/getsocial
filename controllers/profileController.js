const Users = require('../models/user');

module.exports.profile = (req,res) => {
    
    if(req.cookies.user_id)
    {
            Users.findById(req.cookies.user_id)
            .then((user) => {
                if(user)
                {
                    return res.render('profile', {
                        title: "Profile",
                        user: user
                    })
                }
                else
                {
                    return res.redirect('/users/signin')
                }
            })
    }

    else
    {
        return res.redirect('/users/signin')
    }
}