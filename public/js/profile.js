$(document).ready(() => {
    $.get('/user-details/', details => {
        $('#username').attr('value', details.userDetails[0].username);
        $('#email').attr('value', details.userDetails[0].email);
        date = details.userDetails[0].createdAt.substring(0,10);
        $('#registration-date').attr('value', date);
    })
})

function message() {
    $('#message').text('User profile has been updated.', 10000);
}
