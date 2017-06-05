<?php

	function get_DB_config()
	{
		$myfile = fopen("db_configt.conf", "r");
		$content = fgets($myfile);
		fclose($myfile);
		$x = explode(";",$content);
		return $x;
	}

	function getMovies(){
		$movies = array();
		$db_cr = get_DB_config();
		$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
		$sql = "select * from movies where is_available=1;";
		$result = $conn->query($sql);
		while ($row = $result->fetch_assoc()){
			$movie = new StdClass();
			$movie->name = $row["name"];
			$movie->genre = $row["genre"];
			$movie->year = $row["year_"];
			array_push($movies,$movie);
		}
		$conn->close();
		return $movies;
	}

	function main(){
		$movies = getMovies();
		echo "n##".json_encode($movies);
	}
	main();
?>