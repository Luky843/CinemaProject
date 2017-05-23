<?php
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function isEmailUnique($email)
{
	$isUnique = FALSE;
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "select * from users where email like'".$email."';";
	$result = $conn->query($sql);
	if($result->num_rows == 0){
		$isUnique = TRUE;
	}
	$conn->close();
	return $isUnique;
}

function isUsernameUnique($name)
{
	$isUnique = FALSE;
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "select * from users where name like'".$name."';";
	$result = $conn->query($sql);
	if($result->num_rows == 0){
		$isUnique = TRUE;
	}
	$conn->close();
	return $isUnique;
}

function createNewUser($email,$password,$username)
{
	$datetime = date("Y-m-d H:i:s");
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "insert into users(name,password,email,time_of_regisration,isBlocked) values('".$username."','".$password."','".$email."','".$datetime."',0);";
	$conn->query($sql);
	$conn->close();
}

function main()
{
	date_default_timezone_set('Europe/Bratislava');
	$password = $_GET["password"];
	$email = $_GET["email"];
	$username = $_GET["username"];
	if(strlen($password) < 6){
		echo "ads##-1";
		return;
	}
	if(strlen($username) < 4){
		echo "ads##-1";
		return;
	}
	$patern = '/^(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){255,})(?!(?:(?:\\x22?\\x5C[\\x00-\\x7E]\\x22?)|(?:\\x22?[^\\x5C\\x22]\\x22?)){65,}@)(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22))(?:\\.(?:(?:[\\x21\\x23-\\x27\\x2A\\x2B\\x2D\\x2F-\\x39\\x3D\\x3F\\x5E-\\x7E]+)|(?:\\x22(?:[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x21\\x23-\\x5B\\x5D-\\x7F]|(?:\\x5C[\\x00-\\x7F]))*\\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-+[a-z0-9]+)*\\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-+[a-z0-9]+)*)|(?:\\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\\]))$/iD';
	//var_dump( preg_match($patern,$email));
	if(! preg_match($patern,$email)){
		echo "ads##-1";
		return;
	}
	/*************************************************************/
	if(!isEmailUnique($email)){
		echo "ads##-2";
		return;
	}
	if (!isUsernameUnique($username)){
		echo "ads##-3";
		return;
	}
	createNewUser($email,$password,$username);
	echo "sadas##0";
}
main();
?>