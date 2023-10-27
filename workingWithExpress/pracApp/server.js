const express = require('express');
const path = require('path');
const app = express();
const dummyRoute = require('./routes/dummy');
const bodyParser = require('body-parser');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(dummyRoute);


app.listen(3002);
