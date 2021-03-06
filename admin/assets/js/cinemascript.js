﻿// JavaScript source code
charset = "utf-8";
var filmID = 1;


function Logout() {
    sessionStorage.setItem("token", "");
    window.location = "./index.html";
}

function VerifyToken() {
    if (sessionStorage.getItem("token") == '' || sessionStorage.getItem("token") == '-1' || sessionStorage.getItem("token") == '-2' || sessionStorage.getItem("token") == null) {
             window.location.href = "./page-404.html";
    };
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
                    document.getElementById("login_err_label").innerHTML = "Invalid username or password / You are not allowed to view this site.";
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
    xhttp.open("GET", "./php/autorization.php?name="+userName+"&password="+password, true);
    xhttp.send();
}

function getCounts() {
    var count = document.getElementById("count");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            count.innerHTML = res;
        }
    }
    xhttp.open("GET", "./php/getcount.php");
    xhttp.send();
}

function getCountsMovies() {
    var count = document.getElementById("moviesCount");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            count.innerHTML = res;
        }
    }
    xhttp.open("GET", "./php/getcountMovies.php");
    xhttp.send();
}

function getMovies() {
    var id = document.getElementById("idm");
    var name = document.getElementById("name");
    var genre = document.getElementById("genre");
    var description = document.getElementById("description");
    var actors = document.getElementById("actors");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            for (var i = 0; i < res.length; i++) {
                var table = document.getElementById("movieData");
                var row = table.insertRow(table.rows.length);
                row.id = "User_" + res[i].id;

                var cell1 = row.insertCell(0);
                cell1.innerHTML = '<b><a style="cursor:pointer;" onclick="redirect(' + res[i].id + ')">' + res[i].name.charAt(0).toUpperCase() + res[i].name.slice(1) + '</a></b>';
                var cell2 = row.insertCell(1);
                cell2.innerHTML = '<b><span class="bigger">' + res[i].genre.toUpperCase() + '</span></b>';
                var cell3 = row.insertCell(2);
                cell3.innerHTML = res[i].description;
                var cell4 = row.insertCell(3);
                cell4.innerHTML = res[i].actors;
                var cell5 = row.insertCell(4);
                cell5.innerHTML = '<i class="fa fa-trash-o" style="font-size:1.3em; cursor:pointer; color:red;" onclick="DeleteMovie(' + row.id + ')" aria-hidden="true" value="Delete"></i>';
            }
        }
    }
    xhttp.open("GET", "./php/get_list_of_films.php");
    xhttp.send();
}
function redirect(id) {
    localStorage.setItem('movie_id', id);
    window.location.href = "moviedetail.html";
}

function getMdetail() {
    movie = localStorage.getItem('movie_id');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            document.getElementById("name").value = res.name;
			try{
				document.getElementById("genre").value = res.genre;
			}catch(err){}
            document.getElementById("description").value = res.description;
            document.getElementById("actors").value = res.actors;
            document.getElementById("moviedate").value = res.year;
            //document.getElementById("img_url").value = res.img_url;
            document.getElementById("is_available").value = res.is_available;
            document.getElementById("is_show_on_main").value = res.is_show_on_main;
        }
    };
    var url = "./php/getmoviedetail.php?movie=" + movie;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function editMovie() {
    var idm = localStorage.getItem('movie_id');
    var name = document.getElementById("name").value;
    var genre = document.getElementById("genre").options[document.getElementById("genre").selectedIndex].text;
    var img_url = document.getElementById("img_url");
    var actors = document.getElementById("actors").value;
    var year_ = document.getElementById("moviedate").value;
    var description = document.getElementById("description").value;
    var is_available = document.getElementById("is_available").value;
    var is_show_on_main = document.getElementById("is_show_on_main").value;
    var dataM ={
        name: name, genre: genre, actors: actors, year_: year_, description: description, idm: idm, is_available: is_available, is_show_on_main: is_show_on_main
    }
	
    dataM = JSON.stringify(dataM);
	var foromData = new FormData();
	
	foromData.append('x',dataM);
	if(typeof img_url.files[0] != 'undefined'){
		foromData.append('img',img_url.files[0],img_url.files[0].name);
	}
	
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];

            if (res == "0") {
                document.getElementById("reg_succ").innerHTML = "Edit successful!";
                setTimeout(function () {
                    document.getElementById("reg_succ").innerHTML = "";
                }, 3 * 1000);
                $(document).ready(function () {
                   // window.setTimeout(function () { window.location.href = "movies.html" }, 800);
                });
               /* document.getElementById("name").value = "";
                document.getElementById("genre").value = "";
                document.getElementById("img_url").value = "";
                document.getElementById("actors").value = "";
                document.getElementById("moviedate").value = "";
                document.getElementById("description").value = "";*/
                return;
            } else {
                alert("server err");
            }
        }
    }
    xhttp.open("POST", "./php/editmovie.php?x", true);
    xhttp.send(foromData);
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
                row.id = "User_" + res[i].id;

                var cell1 = row.insertCell(0);
                cell1.innerHTML = '<b><a style="cursor:pointer;" onclick="redirectU(' + res[i].id + ')">' + res[i].name.charAt(0).toUpperCase() + res[i].name.slice(1) + '</span></b>';
                var cell2 = row.insertCell(1);
                cell2.innerHTML = '<b><span class="bigger">' + res[i].isblocked + '</span></b>';
                var cell3 = row.insertCell(2);
                cell3.innerHTML = res[i].email;
                var cell4 = row.insertCell(3);
                cell4.innerHTML = res[i].time_of_registration;
                var cell5 = row.insertCell(4);
                cell5.innerHTML = '<i class="fa fa-trash-o red-500" style="font-size:1.3em; cursor:pointer; color:red;" onclick="DeleteRow(' + row.id + ')" aria-hidden="true" value="Delete"></i>';
            }
        }
    }
    xhttp.open("GET", "./php/getusers.php");
    xhttp.send();
}

function redirectU(id) {
    localStorage.setItem('user_id', id);
    window.location.href = "userdetail.html";
}

function getUdetail() {
    user = localStorage.getItem('user_id');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            document.getElementById("username_").innerHTML = res.username_;
            document.getElementById("email_").value = res.email_;
            document.getElementById("time_of_regisration").innerHTML = res.time_of_regisration;
            document.getElementById("password").value = res.password;

			if (res.isAdmin == "0"){
				document.getElementById("admin_select").value = 0;
			}else{
				document.getElementById("admin_select").value = 1;
			}
			if (res.isBlocked == "0"){
				document.getElementById("blocked_select").value = 0;
			}else{
				document.getElementById("blocked_select").value = 1;
			}
        }
    };
    var url = "./php/getuserdetail.php?user=" + user;
    xhttp.open("GET", url, true);
    xhttp.send();
}

function DeleteRow(argv) {
    var u_id = argv.id;
    u_id = u_id.split("_");
    u_id = u_id[u_id.length - 1];

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F44336",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function deleteRow() {


			var xhttp = new XMLHttpRequest();
			var row = document.getElementById(argv.id);
			row.parentElement.removeChild(row);
            xhttp.open("GET", "./php/deleteuser.php?user_id=" + u_id);
			xhttp.send();
            swal("Deleted!", "Current row has been deleted.", "success");
        });
    }
	
function DeleteMovie(argv) {
    var u_id = argv.id;
    u_id = u_id.split("_");
    u_id = u_id[u_id.length - 1];

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F44336",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },
        function deleteMovie() {
			var xhttp = new XMLHttpRequest();
			var row = document.getElementById(argv.id);
			row.parentElement.removeChild(row);
            xhttp.open("GET", "./php/deletemovie.php?movie_id=" + u_id);
			xhttp.send();
            swal("Deleted!", "Current row has been deleted.", "success");
        });
    }


function user_registration() {
    var userName = document.getElementById("username_").value;
    var email = document.getElementById("email_").value;
    var password = document.getElementById("password_").value;
    var filter = /^[a-zA-Z ]{4,25}$/;
    if (!filter.test(userName)) {
        document.getElementById("username_err_label").innerHTML = "Length of username must be longer than 4characters.";
        setTimeout(function () {
            document.getElementById("username_err_label").innerHTML = "";
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
    var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patern.test(email)) {
        document.getElementById("email_err_label").innerHTML = "Please enter valid email address!";
        setTimeout(function () {
            document.getElementById("email_err_label").innerHTML = "";
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
                document.getElementById("reg_succ").innerHTML = "Registration successful!";
                setTimeout(function () {
                    document.getElementById("reg_succ").innerHTML = "";
                }, 3 * 1000);
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "users.html" }, 800);
                });
                document.getElementById("username_").value = "";
                document.getElementById("email_").value = "";
                document.getElementById("password_").value = "";
                return;
            } else if (res == "-2") {
                document.getElementById("email_err_label").innerHTML = "This email is already used!";
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

function newmovie() {
    var name = document.getElementById("name").value;
    var genre = document.getElementById("genre").options[document.getElementById("genre").selectedIndex].text;
    var img_url = document.getElementById("img_url");
    var actors = document.getElementById("actors").value;
    var moviedate = document.getElementById("moviedate").value;
    var description = document.getElementById("description").value;
	
	var form_data = new FormData();
	form_data.append('name',name);
	form_data.append('genre',genre);
	form_data.append('img_url',img_url.files[0], img_url.files[0].name);
	form_data.append('actors',actors);
	form_data.append('moviedate',moviedate);
	form_data.append('description',description);
	console.log(form_data);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];

            if (res == "0") {
                document.getElementById("reg_succ").innerHTML = "New movie has been successfuly added!";
                setTimeout(function () {
                    document.getElementById("reg_succ").innerHTML = "";
                }, 3 * 1000);
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "movies.html" }, 800);
                });
               /* document.getElementById("name").value = "";
                document.getElementById("genre").value = "";
                document.getElementById("img_url").value = "";
                document.getElementById("actors").value = "";
                document.getElementById("moviedate").value = "";
                document.getElementById("description").value = "";*/
                return;
            }else {
                alert("server err");
            }
        }
    }
    xhttp.open("POST", "./php/newmovie.php", true);
    xhttp.send(form_data);
}

function Search() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("usersData");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function SearchMovies() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("movieData");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function getUsersOnMain() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var time_of_registration = document.getElementById("time_of_registration");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            for (var i = 0; i < res.length; i++) {
                var table = document.getElementById("usersMain");
                var row = table.insertRow(table.rows.length);

                var cell1 = row.insertCell(0);
                cell1.innerHTML = '<b><span>' + res[i].name.charAt(0).toUpperCase() + res[i].name.slice(1) + '</span></b>';
                var cell2 = row.insertCell(1);
                cell2.innerHTML = '<b><span class="bigger">' + res[i].email + '</span></b>';
                var cell3 = row.insertCell(2);
                cell3.innerHTML = res[i].time_of_registration;
            }
        }
    }
    xhttp.open("GET", "./php/getusersOnMain.php");
    xhttp.send();
}

function getMoviesOnMain() {
    var name = document.getElementById("name");
    var genre = document.getElementById("genre");
    var year = document.getElementById("year");

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            res = JSON.parse(res);
            for (var i = 0; i < res.length; i++) {
                var table = document.getElementById("moviesMain");
                var row = table.insertRow(table.rows.length);

                var cell1 = row.insertCell(0);
                cell1.innerHTML = '<b><span>' + res[i].name.charAt(0).toUpperCase() + res[i].name.slice(1) + '</span></b>';
                var cell2 = row.insertCell(1);
                cell2.innerHTML = '<b><span class="bigger">' + res[i].genre + '</span></b>';
                var cell3 = row.insertCell(2);
                cell3.innerHTML = res[i].year;
            }
        }
    }
    xhttp.open("GET", "./php/getMoviesOnMain.php");
    xhttp.send();
}

function edit_user()
{
    var mail = document.getElementById("email_").value;
    var is_admin = document.getElementById("admin_select").value;
    var is_blocked = document.getElementById("blocked_select").value;
    var password = document.getElementById("password").value;
    var patern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patern.test(mail)) {
        alert('eml fail');
        return;
    }

    var req = {
        email: mail,
        password: password,
        admin: is_admin,
        blocked: is_blocked,
        uid: localStorage.getItem('user_id')
    }
    req = JSON.stringify(req);

    var xhthp = new XMLHttpRequest();
    xhthp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.response;
            res = res.split("##");
            res = res[res.length - 1];
            if (res == '0') {
                document.getElementById("reg_succ").innerHTML = "Edit successful!";
                setTimeout(function () {
                    document.getElementById("reg_succ").innerHTML = "";
                }, 3 * 1000);
                $(document).ready(function () {
                    window.setTimeout(function () { window.location.href = "users.html" }, 800);
                });
            } else {
                alert('Error!');
            }          
        }
    }
    xhthp.open('GET', './php/edit_user.php?x=' + req, true);
    xhthp.send();
}

function add_show_time()
{
	var date = document.getElementById('date_picker');
	var parts = date.value.split(/[\s|\s-\s|:]/);
	var dat = parts[2] + "-";
	switch(parts[1]){
		case "January" : dat += "1-"; break;
		case "February" : dat += "2-"; break;
		case "March" : dat += "3-";break;
		case "April" : dat += "4-";break;
		case "May" : dat += "5-";break;
		case "June" : dat += "6-";break;
		case "July" : dat += "6-";break;
		case "August" : dat += "8-";break;
		case "September" : dat += "9-";break;
		case "October" : dat += "10-";break;
		case "November" : dat += "11-";break;
		case "December" : dat += "12-";break;
	} 
	dat += parts[0] + " ";
	var p = parseInt(parts[5]);
	if (parts[7] == "pm" && p != 12)
		p += 12;
	else if(parts[7] == "am" && p == 12)
		p = 0;
	dat += p + ":";
	dat += parts[6] + ":00";
	//console.log(dat);
	/**END OF DATE PARSER**/
	var token = sessionStorage.getItem('token');
	var uid = localStorage.getItem('movie_id');
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){}
	xhttp.open('POST','./php/add_show.php?token='+token+'&showtime='+dat+'&movie_id='+uid,true);
	xhttp.send();
	
}
