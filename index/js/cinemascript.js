// JavaScript source code
charset = "utf-8";
var filmID = 1;

function zmen(img_object, seatID) {
    var usr_reserv_count = 0;
    for (var i = 1; i <= 30; i++) {
        var d = document.getElementById("t" + i);
        if (d.src.indexOf("img/seats/boxyellow1.png") != -1 || d.src.indexOf("img/seats/boxblue1.png") != -1) {
            usr_reserv_count++;
        }
    }
    while (true) {
        if (img_object.src.indexOf("img/seats/boxyellow1.png") != -1) {
            img_object.src = "img/seats/boxgray2.png";
            usr_reserv_count--;
            break;
        }
        if (img_object.src.indexOf("img/seats/boxblue1.png") != -1) {
            img_object.src = "img/seats/boxgray2.png";
            usr_reserv_count--;
            break;
        }
        if (usr_reserv_count < 6 && img_object.src.indexOf("img/seats/boxgray2.png") != -1) {
            img_object.src = "img/seats/boxyellow1.png";
            usr_reserv_count++;
            break;
        }
        break;
    }
    
}

function submit_seat_ch()
{
    var seat_arr = [];
    for (var i = 0; i < 30; i++) {
        var seat_elm = document.getElementById('t' + (i + 1));
        if (seat_elm.src.indexOf("img/seats/boxgray2.png") != -1) {
            seat_arr[i] = 1;
        } else if (seat_elm.src.indexOf("img/seats/boxyellow1.png") != -1 || seat_elm.src.indexOf("img/seats/boxblue1.png") != -1) {
            seat_arr[i] = 3;
        } else {
            seat_arr[i] = 0;
        }
    }
    var t = sessionStorage.getItem('token');
    var obj = {
        showID : filmID,
        token: t,
        seats : seat_arr
    }
    obj = JSON.stringify(obj);
    console.log(obj);
    xhtp = new XMLHttpRequest();
    xhtp.onreadystatechange = function () {

    }
    xhtp.open('POST', "./php/change_seat_status.php?x=" + obj, true);
    xhtp.send();
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
    filmID = movie_id.value;
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
    var url = "./php/get_list_of_seats.php?token=" + token + "&movie=" + filmID;
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
    xhttp.open("GET", "./php/autorization.php?name="+userName+"&password="+password, true);
    xhttp.send();
}

function loggedUser() {
    var token = sessionStorage.getItem("token");
    if (token == "" || token == undefined || token == null) {
        document.getElementById("state").innerHTML = "Log in";
    }
    else {
        document.getElementById("state").innerHTML = "Log out";
        getCardNumber();
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
    var url = "./php/getusername.php?token="+token;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function getCardNumber() {
    token = sessionStorage.getItem("token");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            document.getElementById("card").innerHTML = res;
        }
    };
    var url = "./php/getcardnumber.php?token=" + token;
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
        document.getElementById("username_err_label").innerHTML = "Length of username must be longer than 4characters and must contains number,lowercase and uppercase letter.";
        setTimeout(function () {
            document.getElementById("username_err_label").innerHTML = "";
        }, 3 * 1000);
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
        document.getElementById("pass_err_label").innerHTML = "Length of password must be longer than 8characters and must contains number,lowercase and uppercase letter.";
        setTimeout(function () {
            document.getElementById("pass_err_label").innerHTML = "";
        }, 3 * 1000);
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
                document.getElementById("email_err_label").innerHTML = "This email is used already used!";
            }else if(res == "-3"){
                document.getElementById("username_err_label").innerHTML = "Username already exists!";
            } else {
                alert("server err");
            }
        }
    }
    xhttp.open("GET", "./php/registration.php?username=" + userName + "&password=" + password + "&email=" + email, true);
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
    var url = "./php/changepassword.php?token=" + token + "&oldpassword=" + oldPassword + "&newpassword="+newPassword;
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
            res = res[res.length -1];
            res = JSON.parse(res);
            for (var i = 0; i < res.length; i++) {
                if (i % 2 == 0) {
                    //console.log("call left");
                    var list = document.getElementById("index_list_left");
                    var item = document.createElement("li");
                    item.className = "clearfix";
                    var img = document.createElement("img");

                    img.src = res[i].img_url;
                    img.className = "img-responsive";
                    img.width = "90";
                    img.alt = "menu-img";
                    item.appendChild(img);

                    var detail = document.createElement("div");
                    detail.className = "detail";
                    detail.innerHTML = "<h4>" + res[i].name + "</h4>" + res[i].description + '<span class="price">6.50€</span>';
                    item.appendChild(detail);
                    list.appendChild(item);
                } else {
                    var list = document.getElementById("index_list_right");
                    var item = document.createElement("li");
                    item.className = "clearfix";
                    var img = document.createElement("img");

                    img.src = res[i].img_url;
                    img.className = "img-responsive";
                    img.width = 90;
                    img.alt = "menu-img";
                    item.appendChild(img);

                    var detail = document.createElement("div");
                    detail.className = "detail";
                    detail.innerHTML = "<h4>" + res[i].name + "</h4>" + res[i].description + '<span class="price">6.50€</span>';
                    item.appendChild(detail);
                    list.appendChild(item);
                }

            }
        }
    }
    xhhtp.open("GET", "./php/get_list_of_films.php", true);
    xhhtp.send();
}


function loadGenres()
{
    var xhhp = new XMLHttpRequest();
    xhhp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);

            for (var i = 0; i < res.length; i++) {
                var opt = document.createElement("option");
                opt.innerHTML = res[i];
                opt.value = res[i];
                document.getElementById("sel1").appendChild(opt);
            }
            loadMovieBycategory(document.getElementById("sel1"));
        }
    }
    xhhp.open("GET", "./php/load_genres.php", true);
    xhhp.send();
}

function loadMovieBycategory(argv)
{
    var xhhp = new XMLHttpRequest();
    xhhp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
           // res = [{ "id": "1", "name": "VOTRELEC: COVENANT", "description": "Ridley Scott sa vracia do vesm\u00edru, ktor\u00fd stvoril vo svojej kultovej s\u00e9rii Votrelec.", "actors": null, "year": "2017", "img_url": ".\/img\/movies\/1.jpg" }];
            document.getElementById("mov_left").innerHTML = "";
            document.getElementById("mov_right").innerHTML = "";

            for (var i = 0; i < res.length; i++) {
                if (i % 2 == 0) {
                    var list = document.getElementById("mov_left");
                } else {
                    var list = document.getElementById("mov_right");
                }
                var item = document.createElement("li");
                item.className = "clearfix";

                var image = document.createElement("img");
                image.src = res[i].img_url;
                image.className = "img-responsive";
                image.width = 90;
                image.alt = "menu-img";
                item.appendChild(image);

                var div_ = document.createElement("div");
                div_.className = "detail";
                var p = document.createElement('h4');
                p.innerHTML = res[i].name;
                div_.appendChild(p);
                p = document.createElement('p');
                p.innerHTML = res[i].description;
                div_.appendChild(p);

                var d2 = document.createElement('div');
                d2.className = "form-group";
                d2.style = "padding-bottom:22px;";

                var span = document.createElement('span');
                span.className = "col-lg-5";
                span.style = "margin-left:-15px;";

                var select = document.createElement('select');
                select.className = "form-control margin-b-20";
                select.name = "account";
                select.id = "select" + res[i].id;
               // select.setAttribute("onload", "load_shows('" + select.id + "')");
                /************************************/
               /* var shows = load_shows(res[i].id);
                console.log(shows);
                if (shows !== -1) {
                    for (var j = 0; j < shows.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = shows[j].ids;
                        opt.innerHTML = shows[j].showtime;
                        select.appendChild(opt);
                    }
                }*/
                span.appendChild(select);
                d2.appendChild(span);
                div_.appendChild(d2);
                div_.innerHTML += '<div class="col-sm-6 text-center" style="margin-left:-15px;" id="div_film_'+res[i].id+'">'+
                                     //  ' <a data-toggle="modal" data-target="#myModal" onclick="showMovie(5)" class="btn btn-lg btn-yellow">Book now <i class="fa fa-angle-right"></i></a>'+
                                   ' </div>'+
                                   ' <span class="price">6.50€</span>';

                item.appendChild(div_);

                list.appendChild(item);

                load_shows(select.id, res[i].id, 'div_film_' + res[i].id);
            }
        }
    }
    xhhp.open("GET", "./php/load_movies_by_genre.php?genre="+argv.value, true);
    xhhp.send();
}

function load_shows(element_id,movie_id,btn_div_id)
{
    //console.log(element_id + " " + movie_id);

    var xhhp = new XMLHttpRequest();
    xhhp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
          
            if (res == "[]") {
            } else {
                res = JSON.parse(res);
                var select = document.getElementById(element_id);
                select.id = "mov_chose" + movie_id;
                for (var i = 0; i < res.length; i++) {
                    var option = document.createElement('option');
                    option.value = res[i].ids;
                    option.innerHTML = res[i].showtime;
                    select.appendChild(option);
                }
                var btn_div = document.getElementById(btn_div_id);
                btn_div.innerHTML = '<a data-toggle="modal" data-target="#myModal" onclick="showMovie('+select.id+')" class="btn btn-lg btn-yellow">Book now <i class="fa fa-angle-right"></i></a>'
            }
        }
    }
    xhhp.open("GET", "./php/get_list_of_shows.php?film=" + movie_id, true);
    xhhp.send();
}


//TEST
function loadShows()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.status == 200 && this.readyState == 4) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
           
            for (var i = 0; i < res.length; i++) {
                var zoznam = document.getElementById("zoznam");
                var polozka = document.createElement('li');
                polozka.vaue = res[i].ids;
                if (i % 2 == 0){
                    polozka.className = "parna";
                } else {
                    polozka.className = "neparna";
                }

                var image = document.createElement('img');
                image.height = 60;
                image.width = 40;
                image.src = res[i].img_url;
                polozka.appendChild(image);

                var h = document.createElement('b');
                h.innerHTML = res[i].name;
                polozka.appendChild(h);

                var d = document.createElement('div');
                d.innerHTML = res[i].description;
                polozka.appendChild(d);

                var cas = document.createElement('b');
                cas.innerHTML = "showtime: " + res[i].showtime;
                polozka.appendChild(cas);

                var btn = document.createElement('button');
                btn.innerHTML = "book show";
                btn.setAttribute("onclick", "rezervuj(this)");
                polozka.appendChild(btn);

                zoznam.appendChild(polozka);
            }
        }
    }
    xhttp.open("GET", "./php/load_shows.php", true);
    xhttp.send();
}

function rezervuj(argv) {
    alert(argv.vaue);
}
