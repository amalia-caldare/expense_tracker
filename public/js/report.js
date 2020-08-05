$(document).ready(() => {
    $.get('/report-entries/', data => {
        console.log(data)
        $('#results').append(
                `<h1> Expense Report</h2>

                <h2> Expense Report from <span id="from"></span> to <span id='to'></span> </h2>
                
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                    </tr>
                    </thead>
                    <tbody id="rows">
                
                    </tbody>
                </table>`)
        $('#from').text(data.from);
        $('#to').text(data.to);

        for(var i = 0; i < data.expensesReport.length; i++) {
            $('#rows')
            .after(`<tr>`  +
                        `<td id="date"></td>` +
                         `<td id="amount"></td>` +
                   `</tr>`)

            const date = new Date(data.expensesReport[i].expenseDate);
            $('#date').text(addDays(date, 1).toString().substring(0,11));
            $('#amount').text(data.expensesReport[i]["sum(`expenseCost`)"]);
          
        }
    })
})
function addDays(date, days) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }
