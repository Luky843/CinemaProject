<?php
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function editMovie($name,$genre,$img_url,$actors,$year_,$description,$idm,$is_available)
{
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "update movies set name='".$name."',genre='".$genre."',description='".$description."',actors='".$actors."',year_='".$year_."',img_url='".$img_url."',is_available=".$is_available." where idm =".$idm." ;";
	$conn->query($sql);
	mysqli_error($conn);
	$conn->close();
}

function main()
{
	$data = $_GET["x"];
	$data = json_decode($data);
	editMovie($data->name,$data->genre,$data->img_url,$data->actors,$data->year_,$data->description,$data->idm,$data->is_available);
	echo "dsfsd##0";
}
main();
?>