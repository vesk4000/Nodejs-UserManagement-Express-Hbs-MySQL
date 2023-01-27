// const express = require('express');
// const ejs = require('ejs');
// // const exphbs = require('express-handlebars');
// //const bodyParser = require('body-parser'); // No longer Required
// //const mysql = require('mysql'); // Not required -> moved to userController

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Parsing middleware
// // Parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.urlencoded({ extended: true })); // New

// // Parse application/json
// // app.use(bodyParser.json());
// app.use(express.json()); // New

// // Static Files
// app.use(express.static('public'));

// // Templating Engine
// // EJS Setup
// app.set('view engine', 'ejs');
// app.set('views', 'views');
// // app.set('views', 'layouts_EJS'); 

// // HBS OLD
// // const handlebars = exphbs.create({ extname: '.hbs', });
// // app.engine('.hbs', handlebars.engine);
// // app.set('view engine', '.hbs');

// // You don't need the connection here as we have it in userController
// // let connection = mysql.createConnection({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASS,
// //   database: process.env.DB_NAME
// // });

// const routes = require('./server/routes/user');
// app.use('/', routes);

// app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express');
// const ejs = require('ejs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.set('view engine', 'ejs');
// app.set('views', 'views');
// app.engine('ejs', ejs.renderFile);

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));