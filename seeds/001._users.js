exports.seed = function(knex) {
      return knex('users').insert([
        { username: 'Amalia Caldare', email: 'amaliacaldare20@gmail.com', password: 'password'},

      ]);
};
