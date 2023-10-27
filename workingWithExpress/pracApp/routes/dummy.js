const express = require('express');
const path = require('path');
const router = express.Router()
const usersAdded =[];

router.post('/users',(req,res) =>{
    usersAdded.push(req.body.name);
    res.redirect('/users');
});

router.get('/users',(req,res) =>{
    console.log(usersAdded);
    res.render('users',{usersAdded});
});

router.get('/',(req,res) =>{
   res.render('home',{pageTitle:'Home'});
});


module.exports = router;