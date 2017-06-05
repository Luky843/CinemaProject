<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getuseretail($user){
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "SELECT * FROM users where idu ='".$user."';";
		$result = $conn->query($sql);
		$user = new StdClass();
		if ($row = $result->fetch_assoc()){
			$user->username_ = $row["name"];
			$user->email_ = $row["email"];
			$user->time_of_regisration = $row["time_of_regisration"];
			$user->isAdmin = $row["isAdmin"];
			$user->isBlocked = $row["isBlocked"];
		}
		$conn->close();
		return $user;
	}

	function main(){
		$user= $_GET["user"];
		$user = getuseretail($user);
		echo "n##".json_encode($user);
	}
	main();
?>