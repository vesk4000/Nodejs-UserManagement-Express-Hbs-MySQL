const express = require('express');

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

const routes = require('./routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));