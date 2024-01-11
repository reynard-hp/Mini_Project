const data = JSON.parse(sessionStorage.getItem('userData'));

$(document).ready(function () {
    let userName = data.userName;  
    $("#username").text(userName);
    
    $(".logout-button").click(function (e) { 
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = '../index.html';
    });
});


