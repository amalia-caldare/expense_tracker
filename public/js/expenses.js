$(document).ready(() => {
    $.get('/expenses-list/', data => {
        console.log(typeof(data.expenses[0].expenseDate))
        for(var i = 0; i < data.expenses.length; i++) {
            $('#rows')
            .after(`<tr>`  +
                        `<td id="item"></td>` +
                         `<td id="cost"></td>` +
                         `<td id="date"></td>` +
                   `</tr>`)
                  
            $('#item').text(data.expenses[i].expenseItem);
            $('#cost').text(data.expenses[i].expenseCost);
            $('#date').text(data.expenses[i].expenseDate.substring(0,10));
        }
    })
    
})

function message() {
    alert('Expense has been added');
}

