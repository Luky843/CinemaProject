// JavaScript source code
charset = "utf-8";
var filmID = 1;


function Logout() {
    sessionStorage.setItem("token", "");
    window.location = "./index.html";
}

function logIn(){
    var userName = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length -1];
            if (res == "-1" || res == "-2") {
                document.getElementById("login_err_label").innerHTML;
                if(res == "-1")
                    document.getElementById("login_err_label").innerHTML = "Invalid username or password.";
                else
                    document.getElementById("login_err_label").innerHTML = "Your account is not activated.";
                setTimeout(function () {
                    document.getElementById("login_err_label").innerHTML = "";
                }, 3 * 1000);
                sessionStorage.setItem("token", res);
            } else {
                document.getElementById("login_scs_label").innerHTML = "You have successfully logged in.";
                setTimeout(function () {
                    document.getElementById("login_scs_label").innerHTML = "";
                }, 2 * 1000);
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "./admin.html" }, 500);
                });
                sessionStorage.setItem("token", res);

                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("login_err_label").innerHTML = "";
            }
        }
    }
    xhttp.open("GET", "./autorization.php?name="+userName+"&password="+password, true);
    xhttp.send();
}

function getUsers() {
    var id = document.getElementById("id");
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var isblocked = document.getElementById("isblocked");
    var time_of_registration = document.getElementById("time_of_registration");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            for (var i = 0; i < res.length; i++)
            {       
                var table = document.getElementById("usersData");
                var row = table.insertRow(table.rows.length);

                var cell1 = row.insertCell(0);
                cell1.innerHTML = '<b><span class="bigger">' + res[i].name + '</span></b>';
                var cell2 = row.insertCell(1);
                cell2.innerHTML = '<b><span class="bigger">' + res[i].isblocked + '</span></b>';
                var cell3 = row.insertCell(2);
                cell3.innerHTML = res[i].email;
                var cell4 = row.insertCell(3);
                cell4.innerHTML = res[i].time_of_registration;
                var cell5 = row.insertCell(4);
                cell5.innerHTML = '<i class="fa fa-trash-o red-500" style="font-size:1.3em; cursor:pointer" onclick="DeleteRow(this)" aria-hidden="true" value="Delete"></i>'; 
            }
        }
    }
    xhttp.open("GET", "./getusers.php");
    xhttp.send();
}

function user_registration() {
    var userName = document.getElementById("username_").value;
    var email = document.getElementById("email_").value;
    var password = document.getElementById("password_").value;
    var confirm_pasword = document.getElementById("confirm-password_").value;
    if (userName.length < 4) {
        document.getElementById("username_err_label").innerHTML = "Length of username must be longer than 4characters.";
        setTimeout(function () {
            document.getElementById("username_err_label").innerHTML = "";
        }, 2 * 1000);
        return;
    }
    if (password.length < 6){
        document.getElementById("pass_err_label").innerHTML = "Length of password must be longer than 6characters.";
        setTimeout(function () {
            document.getElementById("pass_err_label").innerHTML = "";
        }, 2 * 1000);
        return;
    }
    if (password != confirm_pasword) {
        document.getElementById("samepass_err_label").innerHTML = "Passwords do not match!";
        setTimeout(function () {
            document.getElementById("samepass_err_label").innerHTML = "";
        }, 2 * 1000);
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];

            if (res == "0") {
                document.getElementById("reg_succ").innerHTML = "Registration successful, please login!";
                setTimeout(function () {
                    document.getElementById("reg_succ").innerHTML = "";
                }, 3 * 1000);
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "admin.html" }, 800);
                });
                document.getElementById("username_").value = "";
                document.getElementById("email_").value = "";
                document.getElementById("password_").value = "";
                document.getElementById("confirm-password_").value = "";
                return;
            } else if (res == "-2") {
                document.getElementById("email_err_label").innerHTML = "This email is used already used!";
            }else if(res == "-3"){
                document.getElementById("username_err_label").innerHTML = "Username already exists!";
            } else {
                alert("server err");
            }
        }
    }
    xhttp.open("GET", "./registration.php?username=" + userName + "&password=" + password + "&email=" + email, true);
    xhttp.send();
}
