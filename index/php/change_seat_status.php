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
	$sql = "select * from token where value_ like '".$token."';";
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

function check_DB($show_id,$user_id)
{
	$content = array();
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from seats where show_=".$show_id.";";
	$result = $conn->query($sql);
	while($row = $result->fetch_assoc()){
		$isReseved = $row["isReseved"];
		if ($isReseved == 0){
			array_push($content,1);
		}else{
			$user = $row["usr"];
			if ($user == $user_id){
				array_push($content,3);
			}else{
				array_push($content,2);
			}
		}
	}
	return $content;
}

function over_write_seats($check_arr,$user_ID,$show,$new_arr)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	
	for ($i =0 ; $i < 30; $i++){
		if ($check_arr[$i] == 1 && $new_arr[$i] == 1)
			continue;
		if ($check_arr[$i] == 3 && $new_arr[$i] == 1){
			$sql = "update seats set isReseved=0, usr=NULL where num=".($i +1)." and show_=".$show.";";
			$conn->query($sql);
		}else if ($check_arr[$i] == 1 && $new_arr[$i] == 3){
			$sql = "update seats set isReseved=1, usr=".$user_ID." where num=".($i +1)." and show_=".$show.";";
			$conn->query($sql);
		}
	}
	$conn->close();
}

/*main******************************/
function main()
{
	$recived = $_GET["x"];
	$recived = json_decode($recived);
	$user_ID = getUserId($recived->token);
	$check_arr = check_DB($recived->showID,$user_ID);
	over_write_seats($check_arr,$user_ID,$recived->showID,$recived->seats);
	

}
main();
?>