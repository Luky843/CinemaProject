<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function deleteUser($idu){
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "update users set isDeleted=1 where idu=".$idu.";";
		$conn->query($sql);
		$conn->close();
	}
	

	function main(){
		$user_id = $_GET ['user_id'];
		deleteUser($user_id);
	}
	main();
?>