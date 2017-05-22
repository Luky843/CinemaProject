<?php
	$name = $_GET["name"];
	$password = $_GET["password"];
	$user_id = "";
	$isAdmin = 0;
	date_default_timezone_set('Europe/Bratislava');
	
	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}
	
	function generateRandomString($length = 20) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}
	
	function isTokenUnique($token)
	{
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select * from token where value_ like '".$token."';";
		$result = $conn->query($sql);
		if($result->num_rows > 0)
		{
			$conn->close();
			return 0;
		}
		$conn->close();
		return 1;
	}
		
	
	function validate_autorization()
	{
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	
		$sql = "select * from users where name like'".$GLOBALS["name"]."' and password like'".$GLOBALS["password"]."';";
		$result = $conn->query($sql);
		
		$output = "-1";
		
		if ($result->num_rows > 0)
		{
			while ($rws = $result->fetch_assoc())
			{
				//echo $rws["name"] ." ". $rws["password"];
				$GLOBALS["user_id"] = $rws["idu"];
				$GLOBALS["isAdmin"] = $rws["isAdmin"];
				$isBlocked = (int)$rws["isBlocked"];
				if($isBlocked == 1){
					$conn->close();
					return "-2";
				}
			}
			do {
				$output = generateRandomString();
				$t = isTokenUnique($output);
			}while($t == 0);
			//$output = generateRandomString();
		}
		$conn->close();
		return $output;
	}
	
	function removeOldToken($uid)
	{

	}
	function deactivate_old_token($uid)
	{
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "update token set isExpired=1 where idu=".$uid.";";
		$conn->query($sql);
		$conn->close();
	}
	
	function writeTokenToDB($content,$uid)
	{
		deactivate_old_token($uid);
		$dat_ = date("Y-m-d H:i:s");
		//echo $dat_." ";
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "insert into token(idu,value_,time_of_create) values(".$uid.",'".$content."','".$dat_."');";
		$conn->query($sql);
		/*if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}*/
		$conn->close();
		
	}
	/************************************************************************************************************/
	$output = validate_autorization();
	
	if(0 == strcmp("-1",$output) || 0 == strcmp("-2",$output)){	
	}else{
		writeTokenToDB($output,$user_id);
	}
	

	echo "dasdas##".$output;
?>