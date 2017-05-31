<?php 

function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function get_shows()
{
	$dat_ = date("Y-m-d H:i:s");
	$shows = array();
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select idm,name,genre,description,actors,year_,img_url,showtime,ids from shows inner join movies on idm=idmov where movies.is_available=1 and shows.is_available=1 and showtime > '".$dat_."' order by showtime asc;";
	$result = $conn->query($sql);
	while ($row = $result->fetch_assoc()){
		$data = new StdClass();
		$data->idm =(int) $row["idm"];
		$data->name = $row["name"];
		$data->genre = $row["genre"];
		$data->description = $row["description"];
		$data->actors = $row["actors"];
		$data->year_ =(int) $row["year_"];
		$data->img_url = $row["img_url"];
		$data->showtime = $row["showtime"];
		$data->ids =(int) $row["ids"];
		
		array_push($shows,$data);
	}
	$conn->close();
	return $shows;
	
}

function main()
{
	date_default_timezone_set('Europe/Bratislava');
	$shows = get_shows();
	echo "asdas##". json_encode($shows);
}
main();
?>