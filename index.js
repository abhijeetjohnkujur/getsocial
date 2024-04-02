const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/mongoose');

// Add mongodb database
connectDB();
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


// Adding parent route folder using middlware
app.use('/', require('./routes/index'));

// Adding child route folder using middlware
app.use('/users', require('./routes/users'));

// Extract styles and scripts for sub pages in layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Server start script
app.listen(port, (err) => err ? console.log(err) : console.log(`Server is running on port ${port}`));