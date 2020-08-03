$(document).ready(() => {
    $.get('/user-details/', details => {
        $('#username').attr('value', details.userDetails[0].username);
        $('#email').attr('value', details.userDetails[0].email);
        $('#registration-date').attr('value', details.userDetails[0].createdAt);
    })
})

function message() {
    $('#message').text('User profile has been updated.', 10000);
}
