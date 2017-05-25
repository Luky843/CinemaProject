<?php 
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function get_shows($film_id)
{
	$shows = array();
	
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from shows where idmov=".$film_id." and is_available=1;";
	$result = $conn->query($sql);
	while($row = $result->fetch_assoc()){
		$show = new StdClass();
		
		$show->ids = (int) $row["ids"];
		$show->showtime = $row["showtime"];
		
		array_push($shows,$show);
	}
	$conn->close();
	return $shows;
}

function main()
{
	$film_id = $_GET["film"];
	$shows = get_shows($film_id);
	echo "sad##".json_encode($shows);
}
main();
?>