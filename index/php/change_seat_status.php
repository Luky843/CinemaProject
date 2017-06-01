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
function isUserAdmin($user_id)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from users where idu=".$user_id.";";
	$result = $conn->query($sql);
	if($result->num_rows > 0)
	{
		if($rws = $result->fetch_assoc())
		{
			$isAdmin = $rws["isAdmin"];
		}
	}
	$conn->close();
	return $isAdmin;
}

function whoSeatUse($seat_num,$movieID)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from seats where num=".$seat_num." and show_ = ".$movieID.";";
	$result = $conn->query($sql);
	if($result->num_rows > 0)
	{
		if($rws = $result->fetch_assoc())
		{
			$isUsed = $rws["isReseved"];
			if ($isUsed == 0)
			{
				$conn->close();
				return $isUsed;
			}
			$whoUse = $rws["usr"];
		}
	}
	$conn->close();
	return $whoUse;
}
function reserveSeat($movieID,$seat_num,$user_id)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "update seats set isReseved=1, usr=".$user_id." where num=".$seat_num." and show_=".$movieID.";";
	$conn->query($sql);
	$conn->close();
}

function unReserve($movieID,$seat_num,$user_id)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "update seats set isReseved=0, usr=NULL where num=".$seat_num." and show_=".$movieID." and usr=".$user_id.";";
	$conn->query($sql);
	$conn->close();
}

/*main******************************/
function main()
{
	$token = $_GET["token"];
	$movieID = $_GET["movie"];
	$seat_num = $_GET["seat"];
	
	$user_id = getUserId($token);
	if ($user_id == -1)
	{
		echo "dasd##ERR";
		return;
	}
	$isAdmin = isUserAdmin($user_id);
	$seatUsedby = whoSeatUse($seat_num,$movieID);
	if($seatUsedby == 0)
	{
		reserveSeat($movieID,$seat_num,$user_id);
		echo "sdf##RESERVE";
		return;
	}
	elseif($seatUsedby == $user_id)
	{
		unReserve($movieID,$seat_num,$user_id);
		echo "sds##UNRESERVE";
		return;
	}
	echo "asdsa##NONE";

}
main();
?>