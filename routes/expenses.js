const router = require('express').Router();

const moment = require('moment');


const Expense = require('../models/Expense.js');

const fs = require('fs');

const headerPage = fs.readFileSync('./public/header.html', 'utf8');
const menuPage = fs.readFileSync('./public/menu.html', 'utf8');
const dashboardPage = fs.readFileSync('./public/dashboard.html', 'utf8');
const newItemPage = fs.readFileSync('./public/new-item.html','utf8');
const expensesPage = fs.readFileSync('./public/expenses.html', 'utf8');
const reportFormPage = fs.readFileSync('./public/expenses-report.html','utf8');
const reportResultsPage = fs.readFileSync('./public/report-results.html', 'utf8');
const footerPage = fs.readFileSync('./public/footer.html','utf8');

// // middleware to secure routes
const requireLogin = (req, res, next) => {
    if (req.session.loggedIn == true) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      return res.redirect("/login"); 
    }
}

router.get('/dashboard', requireLogin, (req, res) => {
    return res.send(headerPage + menuPage + dashboardPage + footerPage);
});

router.post('/add-expense', requireLogin, (req, res) => {
  const {date, item, cost} = req.body;
  if(date && item && cost) {
    try{
      Expense.query().insert({
        expense_date: date,
        expense_item: item,
        expense_cost: cost,
        user_id: req.session.userId
      }).then(newItem => {
        return res.redirect('/expenses');
      });
    }
    catch(error) {
      return res.send({response: 'Something went wrong with the DB'});
    }
  }
})

router.post('/delete', requireLogin, async(req, res) => {
  const removedItem = await Expense.query().deleteById().where('user_id', req.session.id);
})

router.get('/add-expense', requireLogin, (req, res) => {
  return res.send(headerPage + menuPage + newItemPage + footerPage);
});

router.get('/expenses-list', requireLogin, async (req, res) => {
  const expenses = await Expense.query()
          .select('id', 'expense_date', 'expense_item', 'expense_cost').where('user_id', req.session.userId).orderBy('id');

    return res.status(200).send({expenses});
})

var {from, to, expensesReport} = 0;

router.post('/expense-report', requireLogin, async(req,res) => {
  from = req.body.from;
  to = req.body.to;
  expensesReport = await Expense.query()
                    .select('expense_cost', 'expense_date').sum('expense_cost').where('expense_date','>', from).where('expense_date','<=', to)
                    .orWhere('expense_date', from).orWhere('expense_date',to)
                    .where('user_id', req.session.userId).groupBy('expense_date');

   return res.redirect('/report-results');
    
})

router.get('/report-entries', requireLogin, async(req,res) => {
  return res.send({from, to, expensesReport})
})

router.get('/report-form', requireLogin, async(req, res) => {
  return res.send(headerPage + menuPage + reportFormPage + footerPage);
})

router.get('/report-results', requireLogin, async(req, res) => {
  return res.send(headerPage + menuPage + reportResultsPage + footerPage);
})

router.get('/expenses', requireLogin, (req, res) => {
  return res.send(headerPage + menuPage + expensesPage + footerPage);
})

router.get('/costs', async(req, res) => {
  const today = moment();
  const todayExpense = await Expense.query().select('expense_cost').where('expense_date',today.format('YYYY-MM-DD'))
                          .where('user_id', req.session.userId);
  
  const yesterday = today.subtract(1, 'days');
  const yesterdayExpense = await Expense.query().select('expense_cost').where('expense_date',yesterday.format('YYYY-MM-DD'))
                            .where('user_id', req.session.userId);
 
  const thirtyDays = today.subtract(30, 'days');
  const thirtyDaysExpense = await Expense.query().select('expense_cost').where('expense_date', '>', thirtyDays.format('YYYY-MM-DD'))
                              .where('user_id', req.session.userId);;

  const totalExpense = await Expense.query().select('expense_cost').where('user_id', req.session.userId)
  
  return res.json({todayExpense, yesterdayExpense, thirtyDaysExpense, totalExpense});
  })



module.exports = router;