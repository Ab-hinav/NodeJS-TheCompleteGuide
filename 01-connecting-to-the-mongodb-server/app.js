const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('656d3d309e0b2baad558e7ca')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://abhinav16197:X6QCoaUCq2fYNAx8@cluster0.umkbxiu.mongodb.net/test1'
  )
  .then(result => {
    User.findOne().then(
      user => {
        if( !user){
          const user = new User({
            name: 'Abhinav',
            email: 'XXXXXXXXXXXXXXXXX',
            cart: {
              items: []
            }
          });
          user.save();
        }
      }
    );
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
