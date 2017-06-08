<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getmoviedetail($movie){
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "SELECT * FROM movies where idm ='".$movie."';";
		$result = $conn->query($sql);
		$movie = new StdClass();
		if ($row = $result->fetch_assoc()){
			$movie->name = $row["name"];
			$movie->description = $row["description"];
			$movie->actors = $row["actors"];
			$movie->year = $row["year_"];
			$movie->genre = $row["genre"];
			$movie->img_url = $row["img_url"];
			$movie->is_available = $row["is_available"];
			$movie->is_show_on_main = $row["is_show_on_main"];
		}
		$conn->close();
		return $movie;
	}

	function main(){
		$movie= $_GET["movie"];
		$movie = getmoviedetail($movie);
		echo "n##".json_encode($movie);
	}
	main();
?>