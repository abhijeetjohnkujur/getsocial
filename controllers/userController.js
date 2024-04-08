const Users = require('../models/user');


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

    // If already signed in
    if(req.cookies.user_id){
        console.log("Already signed in");
        return res.redirect('/users/profile');
    }

    //1.  find the user
        Users.findOne({email:req.body.email})
        // handle user found
        .then((user) => {
            if(user)
            {
              // handle password which don't match

              if(user.password != req.body.password){
                    return res.redirect('back');
                }

             //handle session creation

             res.cookie('user_id',user.id);
             return res.redirect('/users/profile');
              
            }
            else {
            // handle user not found
                console.log("User not found");
                return res.redirect('back');
            }
        })

       .catch(err => {
            console.log(err)
            return res.redirect('back');
        }
        )
}

module.exports.signout = (req,res) => {
    res.clearCookie('user_id');
    return res.redirect('/');
}