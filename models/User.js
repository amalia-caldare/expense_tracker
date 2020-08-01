const { Model} = require ('objection');

const Expense = require('./Expense.js')

class User extends Model {
     static get tableName() {
         return 'users';
     }
     
    static get relationMappings() {
        return {
            electives: {
                relation: Model.HasManyRelation,
                modelClass: Expense,
                join: {
                    from: 'users.id',
                    to: 'expenses.userId'
                }
            }
        }
        
    }
}

module.exports = User;