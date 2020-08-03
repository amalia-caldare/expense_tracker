const router = require('express').Router();

const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

const fs = require('fs');
const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const loginPage = fs.readFileSync('./public/login.html', 'utf8');
const signupPage = fs.readFileSync('./public/signup.html','utf8');


// router.use( function (req, res, next) {
//     if(req.session.loggedIn) {
//         res.redirect('/');
//     }
//     else {
//         next();
//     }
// });

router.get('/login', (req,res, next) => {
    return res.send(headerPage + loginPage);
});
router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username && password) {
        try{
            User.query().select().where('username', username).then(user => {
                if(user.length > 0) {
                    bcrypt.compare(password, user[0].password, function(error, result) {
                        if(error) {
                            console.log(error);
                        }
                        if(result) {
                            req.session.loggedIn = true;
                            req.session.username = user[0].username;
                            req.session.userId = user[0].id;
                            res.redirect('/dashboard');
                        }
                        else {
                            return res.status(400).send('/login? Wrong username or password');
                        }
                    });
                } else {
                    return res.status(400).send('/login?Wrong username or password');
                }
            })
        } catch (error) {
            return res.status(500).send({response: "Something went wrong with the DB"})
        }
    } else {
        return res.status(400).send({response: "username or password missing"})
    }
    //return res.redirect('/dashboard');
});

router.get('/signup', (req, res) => {
    return res.send(headerPage + signupPage);
})

router.post('/signup', (req, res) => {
    const {username, email, password} = req.body;
    if(username && email && password) {
        if(password.length < 8) {
           return res.status(400).send({response: "Password must be 8 charachters or longer"});
        } else {
            try{
                User.query().select('username').where('username', username).then(foundUser => {
                    if(foundUser.length > 0) {
                        return res.status(400).send({response: "User already exists"});
                    } else {
                        bcrypt.hash(password, saltRounds).then(hashedPassword => {
                            User.query().insert({
                                username,
                                email,
                                password: hashedPassword
                            }).then(createdUser => {
                                return res.redirect("/login");
                            })
                        })
                       
                    }
                })
            } catch (error) {
                return res.status(500).send({response: "Something went wrong with the DB"})
           }
        }
    } else {
        return res.status(400).send({response: "username or password missing"})
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(function(error) {
        if(error) {
            res.negotiate(error);
        }
        res.redirect('/login');
    });
});

module.exports = router;