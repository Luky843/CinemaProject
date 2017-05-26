<?php 
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function load_genre()
{
	$genres = array();
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select distinct genre from movies order by genre asc;";
	$result = $conn->query($sql);
	while ($row = $result->fetch_assoc()){
		$r = $row["genre"];
		array_push($genres,$r);
	}
	$conn->close();
	return $genres;
}


function main()
{
	$genres = load_genre();
	echo "sdas##". json_encode($genres);
}
main();
?>
