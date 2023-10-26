const express = require('express');
const path = require('path');
const app = express();
const dummyRoute = require('./routes/dummy');



app.use(express.static(path.join(__dirname, 'public')));

app.use(dummyRoute);


app.listen(3002);
