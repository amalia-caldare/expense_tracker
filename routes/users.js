const router = require('express').Router();
const moment = require('moment');

const User = require('../models/User.js');
const Expense = require('../models/Expense.js');
const { knex } = require('../models/Expense.js');

// // middleware to secure routes
const requireLogin = (req, res, next) => {
    if (req.session.loggedIn == true) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

const fs = require('fs');

const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const menuPage = fs.readFileSync('./public/menu.html', 'utf8');
const profilePage = fs.readFileSync('./public/profile.html', 'utf8');

router.get('/user-details', (req, res) => {
    try{
        User.query().select().where('id', req.session.userId).then(userDetails => {
            console.log(userDetails)
            return res.status(200).json({userDetails});
         })
    } catch(error) {
        return res.send({response: 'Something went wrong with the DB'})
    }
})

router.post('/update-user', (req, res) => {
    const {username, email} = req.body;
    try { 
        User.query().update({
            username: username,
            email: email,
        }).where('id', req.session.userId).then(updatedUser => res.redirect('/profile'));
    } catch (error) {
        return res.status(500).send({response: 'Something went wrong with the DB'});
    }
})

router.get('/profile', requireLogin, (req, res) => {
    res.send(headerPage + menuPage + profilePage);
})


router.get('/costs', async(req, res) => {
    const today = moment();
    //const yesterday = today.subtract(1, 'days');
   // const thirtyDays = today.subtract(30, 'days');
   //  console.log(yesterday)
    const todayExpense = await Expense.query().select('expense_cost').where('expense_date',today.format('YYYY-MM-DD'));
   // const yesterdayExpense = await Expense.query().select('expense_cost').where('expense_date',yesterday.format('YYYY-MM-DD'));
   // const thirtyDaysExpense = await Expense.query().select('expense_cost').where('expense_date', thirtyDays.format('YYYY-MM-DD'));
    return res.json({todayExpense})
    })


module.exports = router;