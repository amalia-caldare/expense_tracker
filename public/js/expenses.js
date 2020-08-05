$(document).ready(() => {
    $.get('/expenses-list/', data => {
        for(var i = 0; i < data.expenses.length; i++) {
            $('#rows')
            .after(`<tr>`  +
                        `<td id="item"></td>` +
                         `<td id="cost"></td>` +
                         `<td id="date"></td>` +
                   `</tr>`)
                  
            $('#item').text(data.expenses[i].expenseItem);
            $('#cost').text(data.expenses[i].expenseCost);
           const date = new Date(data.expenses[i].expenseDate);
            $('#date').text(addDays(date, 1).toString().substring(0,11));
            //$('#date').text(data.accurateDate.substring(0,10));
        }
    })
    
})

function message() {
    alert('Expense has been added');
}

function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }
