exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('expenses').del()
    .then(function () {
      return knex('users').del();
    });
};
