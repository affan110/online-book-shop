var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

router.get('/login', function(req, res){
	 
	if(!req.session.user && !req.cookies.user_sid){
		res.render('admin/login/index', {layout: 'admin-raw'})
	}else{
		res.redirect('/admin/dashbord');
	}
})

router.post('/login',(req,res)=>{
	var username = req.body.username;
	var password = req.body.password;
	if(username == 'admin'){
		if(password == "admin"){
			req.session.user={
				username:username,
				password:password
			}
			res.redirect('/admin/dashbord');
		}else{
			res.redirect('/admin/auth/login');
		}
	}
	else{
		res.redirect('/admin/auth/login');
	}
});
module.exports = router;