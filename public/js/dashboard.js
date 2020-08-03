$(document).ready(() => {
    $.get("/costs/", data => {
        var sumToday = 0;
        for ( var i = 0; i < data.todayExpense.length; i++) {
            sumToday = sumToday + data.todayExpense[i].expenseCost;
        }
        $('#today').html(sumToday);
    }).fail(function (error) {
        console.log(error)
    })
});
 