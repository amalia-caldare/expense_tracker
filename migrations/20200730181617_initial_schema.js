exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
        table.increments('id');
        table.string('username').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();

        table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.dateTime('created_at').defaultTo(knex.fn.now());
    })

    .createTable('expenses', table => {
      table.increments('id');
      table.date('expense_date').notNullable();
      table.string('expense_item').notNullable();
      table.integer('expense_cost').notNullable();

      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id');

      table.dateTime('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.dateTime('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('expenses')
    .dropTableIfExists('users');
  
};
