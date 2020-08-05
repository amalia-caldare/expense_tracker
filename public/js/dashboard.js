$(document).ready(() => {
    $.get("/costs/", data => {
         $('#today').text(totalCost(data.todayExpense));
         $('#yesterday').text(setData(totalCost(data.yesterdayExpense)));
         $('#30days').text(totalCost(data.thirtyDaysExpense));
         $('#total').text(totalCost(data.totalExpense));
    
    }).fail(function (error) {
        console.log(error)
    })

});

function totalCost(sentdata){
    var sum = 0;
    $.each(sentdata,function(index, item){
        sum = sum + item.expenseCost;
      
    })
    return sum;
}

function setData(number) {
  if(number == 0) {
    return '0';
  }
  else if(number > 0 && number <= 1000) {
    return '0.65';
  }
  else if(number > 1000 && number <= 5000){
    return '0.85';
  }
  else if(number > 5000) {
    return '0.99'
  }
}
