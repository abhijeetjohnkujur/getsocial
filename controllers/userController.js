const Users = require('../models/user');


module.exports.signup = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup',{
        title: "Sign Up Page"
    })
}

module.exports.signin = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title: "Sign In Page"
    })
}

// Get signup data
module.exports.create = (req,res) => {
    const {name,email,password,confirm_password} = req.body;
    if(password!== confirm_password){
        console.log(`Passwords do not match for user: ${name} (${email})`);
        return res.redirect('back');
    }

    Users.findOne({email:email}).then(user => {
        if(!user){
            Users.create(req.body).then((user) => {
                return res.redirect('/users/signin');
            }).catch(err => {
                console.log(err)
                return res.redirect('back');
            }
            );
        }
        else{
            return res.redirect('back');
        }
    })
        .catch(err => {
            console.log(err)
            return res.redirect('back');
        }
        );
    
}

// Sign in Logic and create session
module.exports.createSession = (req,res) => {
    return res.redirect('/');
}

// Sign out Logic
module.exports.signout = (req,res) => {
    req.logout((err) => { 
        if(err)
        {
                console.log(err);
        }
            return res.redirect('/');
        }
    );
}