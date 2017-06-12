<?php 

function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function load_films($genre)
{
	$films = array();
	
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from movies where genre like'".$genre."';";
	$result = $conn->query($sql);
	while ($row = $result->fetch_assoc()){
		$movie = new StdClass();
		$movie->id = $row["idm"];
		$movie->name = $row["name"];
		$movie->description = $row["description"];
		$movie->actors = $row["actors"];
		$movie->year = $row["year_"];
		$movie->img_url = $row["img_url"];
		
		array_push($films,$movie);
	}
	$conn->close();
	return $films;
}

function main()
{
	$genre = $_GET["genre"];
	$films = load_films($genre);
	echo "sad##".json_encode($films);
}
main();
?>