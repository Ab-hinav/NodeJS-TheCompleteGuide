const User = require('../models/user');

exports.getLogin = (req,res,next) => {
    // const isLogin = req.session ? req.session.isLoggedIn: false;
    console.log(req.session);
    res.render('auth/login',{
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
}



exports.postLogin = (req,res,next) => {

   
        User.findById('656d3d309e0b2baad558e7ca')
          .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
          })
          .catch(err => console.log(err));

   
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
}