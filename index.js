// run index by npm run dev

const express = require('express');
const path = require ('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const app = express();
const members = require('./Members');



// initialize middleware
// app.use(logger);



// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// homepage routeS
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// members api routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
