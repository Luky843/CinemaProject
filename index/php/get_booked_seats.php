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
		$sql = "select * from token where value_ like '".$token."' and isExpired=0;";
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
			if($rws = $result->fetch_assoc())
			{
				$user_id = $rws["idu"];
			}
		}
		$conn->close();
		return $user_id;
	}
	
	function get_list_of_book($user_id)
	{
		$list = array();
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select seats.num,shows.showtime,movies.name from seats inner join shows on shows.ids = seats.show_ inner join movies on shows.idmov = movies.idm where seats.usr = ".$user_id.";";
		$result = $conn->query($sql);
		while($row = $result->fetch_assoc()){
			$o = new StdClass();
			$o->seat_num = $row["num"];
			$o->showtime = $row["showtime"];
			$o->mov_name = $row["name"];
			array_push($list,$o);
		}
		$conn->close();
		return $list;
	}
	
	function main()
	{
		$token = $_GET['token'];
		$user_id = getUserId($token);
		if($user_id == -1){
				echo "s##-1";
				return;
		}
		$book_list = get_list_of_book($user_id);
		$book_list = json_encode($book_list);
		echo "ad##".$book_list;
	}
	main();
?>