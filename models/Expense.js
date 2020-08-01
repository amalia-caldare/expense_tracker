const {Model} = require('objection');

const User = require('./User.js');

class Expense extends Model {
    static get tableName() {
        return 'expenses';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from:'expenses.userId',
                    to: 'users.id'
                }
            }  
    }
 }
}

module.exports = Expense;