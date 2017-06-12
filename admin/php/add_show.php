<?php 
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function getUserId($token)
{
	$user_id = -1;
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select users.idu from users inner join token on users.idu = token.idu where token.value_ like'".$token."' and token.isExpired = 0 and users.isAdmin = 1 and users.isBlocked = 0;";
	$result = $conn->query($sql);
	if($result->num_rows > 0)
	{
		if($rws = $result->fetch_assoc())
		{
			$user_id = (int)$rws["idu"];
		}
	}
	$conn->close();
	return $user_id;
}

function add_show($showtime,$movie_id)
{
	$succes = false;
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "insert into shows(idmov,showtime) values(".$movie_id.",'".$showtime."');";
	$result = $conn->query($sql);
	if($result){
		$succes = true;
		$sql = "update movies set is_show_on_main=1 where idm = ".$movie_id.";";
		$conn->query($sql);
	}else{
		$succes = false;
	}
	$conn->close();
	return $succes;
}

function get_id_of_new_show($movie_id)
{
	$id = -1;
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select max(ids) from shows where idmov = ".$movie_id.";";
	$result = $conn->query($sql);
	if($row = $result->fetch_assoc()){
		$id = $row['max(ids)'];
	}
	$conn->close();
	return $id;
}

function generate_seats($new_show_id)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	for ($i = 1; $i <= 30; $i++){
		$sql = "insert into seats(num,show_) values(".$i.",".$new_show_id.");";
		$conn->query($sql);
	}
	echo $conn->error;
	$conn->close();
}

function main()
{
	$token = $_GET['token'];
	$user_id = getUserId($token);
	if ($user_id == -1){
		echo "w##-1";
		return;
	}
	$showtime = $_GET['showtime'];
	$movie_id = $_GET['movie_id'];
	$succes = add_show($showtime,$movie_id);
	if($succes){
		$new_show_id = get_id_of_new_show($movie_id);
		generate_seats($new_show_id);
	}else{
		echo "w##-1";
		return;
	}
	echo "w##0";
}
main();
?>