const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// Used for session cokkie management
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 

// Mongo store for storing session data
const MongoStore = require('connect-mongo')


// Add mongodb database
connectDB();

// Add cookie parser
app.use(cookieParser());

// add layout middleware
app.use(expressLayouts); 

//add body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// add middleware for accessing static files
app.use(express.static('assets'));


// Add view engine
app.set('view engine', 'ejs');
app.set('views','./views');


// Extract styles and scripts for sub pages in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// Add session middleware
app.use(session({
    name: 'socialUp',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (6000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/social_app_db_dev',
        autoRemove: 'disabled'
    },
    (err) => {
        console.log(err || 'connect-mongodb setup ok')
    }
)
}))


// Add passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Add middleware
app.use(passport.setAuthenticatedUser);


// Adding parent route folder using middlware
app.use('/', require('./routes/index'));

// Adding child route folder using middlware
// app.use('/users', require('./routes/users'));



// Server start script
app.listen(port, (err) => err ? console.log(err) : console.log(`Server is running on port ${port}`));