const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/user')


// Authentication using passport
passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {
    
    // Find user and establish the identity
    Users.findOne({email: email})
    .then(user => {
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false);
        }
        console.log('Valid user');
        return done(null, user);
    })
    .catch(err => {
        console.log('Error in finding user --> Passport');
        return done(err);
    })
}))

// Serializing the user to decide which key is to be kept in the cookies

    passport.serializeUser((user,done) => {
        done(null, user.id)
    })

// Deserializing the user from the key in the cookies

passport.deserializeUser((id, done) => {
    Users.findById(id)
    .then(user => {
        return done(null, user);
    })
    .catch(err => {
        console.log('Error in finding user --> Passport');
        return done(err);
    })
})

// check authentication

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        // req.user contains current signed-in user from session cookie and we are sending it to locals
        return next();
    }

    // if not signed-in
    return res.redirect('/users/signin');
}

// check 
passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        // req.user contains current signed-in user from session cookie and we are sending it to locals
        res.locals.user = req.user
    }
    next()
}
module.exports = passport