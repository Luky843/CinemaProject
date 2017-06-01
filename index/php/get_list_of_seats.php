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

function getListOfSeats($uid,$movie)
{
	$content = array();
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from seats where show_ = ".$movie.";";
	$result = $conn->query($sql);
	if($result->num_rows > 0)
	{
		while($rws = $result->fetch_assoc())
		{
			$isUsed = $rws["isReseved"];
			if ($isUsed == 0)
			{
				array_push($content,1);
			}else
			{
				$who = $rws["usr"];
				if ($uid == $who)
					array_push($content,3);
				else
					array_push($content,2);
			}
				
		}
	}
	$result->close();
	return $content;
}

function main()
{
	$token = $_GET["token"];
	$movie_id = $_GET["movie"];
	$userID = getUserId($token);
	$arr = getListOfSeats($userID,$movie_id);
	$myJsom = json_encode($arr);
	echo "sdas##".$myJsom;
}

main();
?>