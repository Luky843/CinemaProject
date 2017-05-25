<?php 
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function getUserID($token)
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
			$is_expired = $rws["isExpired"];
			if ($is_expired == 0)
				$user_id = $rws["idu"];
		}
	}
	$conn->close();
	return $user_id;
}

function isOldPasswordValid($user_id,$old_password)
{
	$o_pass = "";
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from users where idu = ".$user_id.";";
	$result = $conn->query($sql);
	if ($row = $result->fetch_assoc()){
		$o_pass = $row["password"];
	}
	$conn->close();
	return ((string)$o_pass == (string)$old_password);
	
}

function chage_password($user_id,$new_password)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "update users set password='".$new_password."' where idu like '".$user_id."';";
	$conn->query($sql);
	$conn->close();
	
}

function main()
{
	$token = $_GET["token"];
	$old_password = $_GET["oldpassword"];
	$new_password = $_GET["newpassword"];
	if ($token == ""){
		echo "??sadas##-1";
		return;
	}
	
	$user_id = getUserID($token);
	if ($user_id == -1){
		echo "--sadas##-1";
		return;
	}
	if(!isOldPasswordValid($user_id,$old_password)){
		echo "sdas##-2";
		return;
	}
	chage_password($user_id,$new_password);
	echo "asd##0";
	
}
main();
?>