// JavaScript source code
charset = "utf-8";
var filmID = 1;

function loggedUser() {
    var token = sessionStorage.getItem("token");
    if (token == "" || token == undefined || token == null) {
        document.getElementById("state").innerHTML = "Log in";
    }
    else {
        document.getElementById("state").innerHTML = "Log out";
    }
}

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
    window.location = "http://ltscinema.wz.sk/";
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