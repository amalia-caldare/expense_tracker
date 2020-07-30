exports.seed = function(knex) {
  return knex('users').select().then(users => {
    console.log(users);
    if(users.length >= 2) {
      return knex('expenses').insert([
        {expense_date: '2020-07-30', expense_item: 'Milk', expense_cost: '63', user_id: users[0].id},
        {expense_date: '2020-07-30', expense_item: 'Vegetables', expense_cost: '200', user_id: users[0].id},
        {expense_date: '2020-07-30', expense_item: 'Fruits', expense_cost: '150', user_id: users[0].id},
        {expense_date: '2019-12-30', expense_item: 'Bed Sheets', expense_cost: '700', user_id: users[0].id},
        {expense_date: '2020-07-29', expense_item: 'Ice Cream', expense_cost: '63', user_id: users[0].id},
        {expense_date: '2019-12-30', expense_item: 'Trip to Bali', expense_cost: '6000', user_id: users[0].id},
        {expense_date: '2020-07-29', expense_item: 'Body lotion', expense_cost: '100', user_id: users[0].id},
        {expense_date: '2019-12-30', expense_item: 'Tatoo', expense_cost: '1600', user_id: users[0].id},
        {expense_date: '2020-07-29', expense_item: 'Shampoo', expense_cost: '99', user_id: users[0].id},
        {expense_date: '2020-07-29', expense_item: 'Headphones', expense_cost: '2500', user_id: users[0].id},
        {expense_date: '2020-06-20', expense_item: 'Dinner outside', expense_cost: '1000', user_id: users[0].id},
        {expense_date: '2020-06-30', expense_item: 'Books', expense_cost: '1500', user_id: users[0].id},
        {expense_date: '2020-06-28', expense_item: 'Milk', expense_cost: '63', user_id: users[0].id},

      ]);
    }
  });
};
