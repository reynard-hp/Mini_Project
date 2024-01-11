$(document).ready(function () {
    $("#register-button").click(function () { 
        if(validRegistration()){
            let name = $("#name").val();
            let email = $("#email").val();
            let password = $("#password").val();
            let url = "https://localhost:7023/api/User";
            let newUser = {
                UserName: name,
                UserEmail: email,
                UserPassword: password,
            };
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(newUser),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    alert("Berhasil Registrasi");
                    location.reload();
                    window.location.href = "/index.html";
                },
                error: function (xhr) {
                    alert("Login failed: " + xhr.responseText);
                }
            });
        }
    });    

    function validRegistration() {
        let name = $("#name").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let confirmPassword = $("#confirm-password").val();
        let checkbox = $("#agree-checkbox");
        if (!name || !name.trim().length) {
          alert("Nama tidak boleh kosong");
          return false;
        }

        let validEmail =
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!email.match(validEmail)) {
          alert("Masukkan email yang sesuai format");
          return false;
        }

        if (password.length < 8) {
          alert("Password harus lebih dari 8 Karakter.");
          return false;
        } else if (!/[A-Z]/.test(password)) {
          alert("Password harus memiliki setidaknya 1 huruf kapital");
          return false;
        } else if (!/[@#$%^&+=_-]/.test(password)) {
          alert("Password harus memiliki setidaknya 1 simbol [@#$%^&+=_-]");
          return false;
        } else if (!/[\d]/.test(password)) {
          alert("Password harus memiliki setidaknya 1 angka");
          return false;
        }

        if (confirmPassword !== password) {
            alert("Confirm password tidak sesuai dengan password");
            return false;
        }

        if (!checkbox.is(":checked")) {
            alert("Checkbox harus dicentang");
            return false;
        }

        return true;
    }
});

