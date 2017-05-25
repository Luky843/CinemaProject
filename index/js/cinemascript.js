// JavaScript source code
charset = "utf-8";
var filmID = 1;

function zmen(img_object,seatID) {
    token = sessionStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            if (res == "RESERVE") {
                img_object.src = "./img/seats/boxblue1.png";
            }
            if (res == "UNRESERVE") {
                img_object.src = "./img/seats/boxgray2.png";
            }
            if (res == "NONE") {
                document.getElementById("error").innerHTML = "This seat is already reserved!";
                setTimeout(function (){
                    document.getElementById("error").innerHTML = "";
                }, 2 * 1000);
            }
        }
    };
    var url = "http://ltscinema.wz.sk/cinema/change_seat_status.php?token=" + token + "&movie=" + filmID + "&seat=" + seatID;
    xhttp.open("GET", url, true);
    xhttp.send();
}

/*
function init() {
    var film = document.getElementById("combo").options[combo.selectedIndex].value;
    var token = sessionStorage.getItem("token");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            
            for (var i = 0; i < 30; i++) {
                id = "t" + (i + 1);
                
                if (res[i] == "1") {
                   // console.log(id + " " + res[i]);
                    document.getElementById(id).className = "volne";
                }
                if (res[i] == "2") {
                   // console.log(id + " " + res[i]);
                    document.getElementById(id).className = "obsadene";
                }
                if (res[i] == "3") {
                   // console.log(id + " " + res[i]);
                    document.getElementById(id).className = "moje";
                }
            }
        }
    };
    var url = "http://localhost/test_cinema/get_list_of_seats.php?token="+token+"&movie="+film;
    xhttp.open("GET", url, true);
    xhttp.send();

}*/

function showAvailability(res) {
    var free = 0;
    var sold = 0;
    var urreservation = 0;
    for (var i = 0; i < res.length; i++) {
        if (res[i] == 1)
            free++;
        if (res[i] == 2)
            sold++;
        if (res[i] == 3)
            urreservation++;
    }
    document.getElementById("free").innerHTML = free;
    document.getElementById("sold").innerHTML = sold;
    document.getElementById("urreservation").innerHTML = urreservation;
}

function showMovie(movie_id) {
    filmID = movie_id;
    token = sessionStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);

            for (var i = 0; i < 30; i++) {
                id = "t" + (i + 1);

                if (res[i] == 1) {
                    // console.log(id + " " + res[i]);
                    document.getElementById(id).src = "./img/seats/boxgray2.png";
                }
                if (res[i] == 2) {
                    // console.log(id + " " + res[i]);
                    document.getElementById(id).src = "./img/seats/boxred1.png";
                }
                if (res[i] == 3) {
                    // console.log(id + " " + res[i]);
                    document.getElementById(id).src = "./img/seats/boxblue1.png";
                }
            }
            showAvailability(res);
        }
    };
    var url = "http://ltscinema.wz.sk/cinema/get_list_of_seats.php?token=" + token + "&movie=" + movie_id;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function Logout() {
    sessionStorage.setItem("token", "");
    window.location = "./login.html";
}

$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});


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
                    window.setTimeout(function () { window.location.href = "index.html" }, 500);
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

function loggedUser() {
    var token = sessionStorage.getItem("token");
    if (token == "" || token == undefined || token == null) {
        document.getElementById("state").innerHTML = "Log in";
    }
    else {
        document.getElementById("state").innerHTML = "Log out";
        getUsername();
        showProfile();
    }
}

function showProfile() {
    document.getElementById("profile").innerHTML = "My profile";
}

function getUsername() {
    token = sessionStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            document.getElementById("user").innerHTML = res;
        }
    };
    var url = "./getusername.php?token="+token;
    xhttp.open("GET", url, true);
    xhttp.send();
}


function user_registration() {
    var userName = document.getElementById("username_").value;
    var email = document.getElementById("email_").value;
    var password = document.getElementById("password_").value;
    var confirm_pasword = document.getElementById("confirm-password_").value;
	var filter = /^[a-zA-Z ]{4,25}$/;
    if (!filter.test(userName)) {
        document.getElementById("username_err_label").innerHTML = "Length of username must be longer than 4characters.";
        setTimeout(function () {
            document.getElementById("username_err_label").innerHTML = "";
        }, 2 * 1000);
        return;
    }
    var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patern.test(email)) {
        document.getElementById("email_err_label").innerHTML = "Please enter valid email address!";
        setTimeout(function () {
            document.getElementById("email_err_label").innerHTML = "";
        }, 2 * 1000);
        return;
    }
    var passfilter=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passfilter.test(password)){
        document.getElementById("pass_err_label").innerHTML = "Length of password must be longer than 8characters and contains number,lowercase and uppercase letter.";
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
                    window.setTimeout(function () { window.location.href = "login.html" }, 800);
                });
                document.getElementById("username_").value = "";
                document.getElementById("email_").value = "";
                document.getElementById("password_").value = "";
                document.getElementById("confirm-password_").value = "";
                return;
            } else if (res == "-2") {
                alert("email exist in db");
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


function passchange()
{
    var oldPassword = document.getElementById("password_ch1").value;
    var newPassword = document.getElementById("password_ch2").value;
    var confNewPass = document.getElementById("password_ch3").value;
    var token = sessionStorage.getItem("token");

    if (newPassword.length < 6) {
        document.getElementById("pass_err_label").innerHTML = "Length of password must be longer than 6characters.";
        return;
    }
    if (newPassword != confNewPass) {
        document.getElementById("samepass_err_label").innerHTML = "Passwords do not match!";
        return;
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            res = this.response;
            res = res.split("##");
            res = res[res.length - 1];

            if (res == "-2") {
                document.getElementById("oldpass_err_label").innerHTML = "Incorrect old password!";
                return;
            } else if (res == "0") {
                document.getElementById("pass_scs_label").innerHTML = "Your password has been changed successfully!";
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "index.html" }, 800);
                });
                document.getElementById("password_ch1").value = "";
                document.getElementById("password_ch2").value = "";
                document.getElementById("password_ch3").value = "";
            } else {
                document.getElementById("pass_err_label").innerHTML = "Server error!";
            }
        }
    }
    var url = "./changepassword.php?token=" + token + "&oldpassword=" + oldPassword + "&newpassword="+newPassword;
    xhttp.open("GET", url, true);
    xhttp.send();

}

function loadMovies()
{
    var xhhtp = new XMLHttpRequest();
    xhhtp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length];
            res = JSON.parse(res);

            //tu som skoncil
        }
    }
    xhhtp.open("GET", "./get_list_of_films.php", true);
    xhhtp.send();
}
