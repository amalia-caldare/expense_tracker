const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.seed = function(knex) {
      return knex('users').insert([
        { username: 'Amalia Caldare', email: 'amaliacaldare20@gmail.com', password: bcrypt.hashSync('password', saltRounds)},

      ]);
};
