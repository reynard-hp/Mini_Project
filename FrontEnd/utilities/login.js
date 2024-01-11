//https://localhost:7023/api/User/login
$(document).ready(function () {
  const savedCredentials = localStorage.getItem("savedCredentials");
  console.log(savedCredentials);
  if (savedCredentials) {
     const { email, password } = JSON.parse(savedCredentials);
     $("#email-input").val(email);
     $("#password-input").val(password);
  }

  $("#login-button").on("click", function () {
    let email = $("#email-input").val();
    let password = $("#password-input").val();
    let rememberCheckbox = $("#remember-check");

    let loginData = {
      UserEmail: email,
      UserPassword: password,
    };

    $.ajax({
      type: "POST",
      url: "https://localhost:7023/api/User/login",
      data: JSON.stringify(loginData),
      contentType: "application/json",
      success: function (data) {
        if (rememberCheckbox.is(":checked")) {
          localStorage.setItem('savedCredentials', JSON.stringify({ email, password }));
        } else {
          localStorage.clear();
        }
        sessionStorage.setItem('userData', JSON.stringify(data));
        window.location.href = "../dashboard.html";
      },
      error: function (xhr) {
        alert("Login failed: invalid username or password");
      },
    });
  });
});










