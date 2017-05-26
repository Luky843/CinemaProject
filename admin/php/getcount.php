<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getCounts(){
		$counter = 0;
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select count(*) from users where isDeleted=0;";
		$result = $conn->query($sql);
		if ($row = $result->fetch_assoc()){		
			$counter = $row['count(*)'];
		}
		$conn->close();
		return $counter;
	}

	function main(){
		$counter = getCounts();
		echo "n##".$counter;
	}
	main();
?>