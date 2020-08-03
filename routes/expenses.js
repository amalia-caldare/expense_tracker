const router = require('express').Router();

const Expense = require('../models/Expense.js');

const fs = require('fs');

const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const menuPage = fs.readFileSync('./public/menu.html', 'utf8');
const dashboardPage = fs.readFileSync('./public/dashboard.html', 'utf8');
const newItemPage = fs.readFileSync('./public/new-item.html','utf8');
const expensesPage = fs.readFileSync('./public/expenses.html', 'utf8');

// // middleware to secure routes
const requireLogin = (req, res, next) => {
    if (req.session.loggedIn == true) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

router.get('/dashboard', (req, res) => {
    return res.send(headerPage + menuPage + dashboardPage);
});

router.post('/add-expense', requireLogin, (req, res) => {
  const {date, item, cost} = req.body;
  console.log(date, item, cost)
  if(date && item && cost) {
    try{
      Expense.query().insert({
        expense_date: date,
        expense_item: item,
        expense_cost: cost,
        user_id: req.session.userId
      }).then(newItem => {
        console.log(newItem);
        return res.redirect('/expenses');
      });
    }
    catch(error) {
      return res.send({response: 'Something went wrong with the DB'});
    }
  }
})

router.get('/add-expense', requireLogin, (req, res) => {
  return res.send(headerPage + menuPage + newItemPage);
});

router.get('/expenses-list', requireLogin, async (req, res) => {
  const expenses = await Expense.query()
          .select('id', 'expense_date', 'expense_item', 'expense_cost').where('user_id', req.session.userId).orderBy('id');
  console.log(expenses)
  res.status(200).send({expenses});
})

router.get('/expenses', requireLogin, (req, res) => {
  return res.send(headerPage + menuPage + expensesPage);
})

module.exports = router;