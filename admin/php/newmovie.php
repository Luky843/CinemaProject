<?php
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function createNewMovie($name,$genre,$img_url,$actors,$year_,$description)
{
	$datetime = date("Y-m-d H:i:s");
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "insert into movies(name,genre,description,actors,year_,img_url) values('".$name."','".$genre."','".$description."','".$actors."','".$year_."','".$img_url."');";
	$conn->query($sql);
	$conn->close();
}

function main()
{
	date_default_timezone_set('Europe/Bratislava');
	$name = $_POST["name"];
	$genre = $_POST["genre"];
	$description = $_POST["description"];
	$actors = $_POST["actors"];
	$year_ = $_POST["moviedate"];
	$image = $_FILES["img_url"];
	$img_path = $_SERVER['DOCUMENT_ROOT'] . '/index/img/movies/'.$image['name']; // na servery odstranit '/LTScinemaV2'
	$img_url = './img/movies/'.$image['name'];
	createNewMovie($name,$genre,$img_url,$actors,$year_,$description);
	move_uploaded_file($image['tmp_name'],$img_path);
	echo "sadas##0";
}
main();
?>