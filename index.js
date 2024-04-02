const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('assets'));


app.set('view engine', 'ejs');
app.set('views','./views');


app.use('/', require('./routes/index'));



app.listen(port, (err) => err ? console.log(err) : console.log(`Server is running on port ${port}`));