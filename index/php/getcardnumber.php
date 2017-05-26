<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getCardnumber($token){
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select cardnumber from users inner join token on users.idu=token.idu where value_ like'".$token."';";
		$result = $conn->query($sql);
		if ($rws = $result->fetch_assoc()){
			$cardnumber = $rws["cardnumber"];
		}
		$conn->close();
		return $cardnumber;
	}

	function main(){
		$token= $_GET["token"];
		echo "n##".getCardnumber($token);
	}
	main();
?>