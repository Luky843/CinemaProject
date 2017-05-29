<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function deleteMovie($idm){
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "update movies set is_available=0 where idm=".$idm.";";
		$conn->query($sql);
		$conn->close();
	}
	
	function main(){
		$movie_id = $_GET ['movie_id'];
		deleteMovie($movie_id);
	}
	main();
?>