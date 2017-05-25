<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getUsers(){
		$users = array();
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select * from users;";
		$result = $conn->query($sql);
		while ($row = $result->fetch_assoc()){
			$user = new StdClass();
			$user->id = $row["idu"];
			$user->name = $row["name"];
			$user->email = $row["email"];
			$user->isblocked = $row["isBlocked"];
			$user->time_of_registration = $row["time_of_regisration"];
			array_push($users,$user);
		}
		$conn->close();
		return $users;
	}

	function main(){
		$users = getUsers();
		echo "n##".json_encode($users);
	}
	main();
?>