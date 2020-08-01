const router = require('express').Router();

const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username && password) {
        try{

        } catch (error) {
            return res.status(500).send({response: "Something went wrong with the DB"})
        }
    } else {
        return res.status(400).send({response: "username or password missing"})
    }
    return res.status(501).send({response: "Not implemented yer"});
});

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
                                return res.send({response: createdUser});
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
    return res.status(501).send({response: " "});
});

module.exports = router;