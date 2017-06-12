<?php
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function editMovie($name,$genre,$img_url,$actors,$year_,$description,$idm,$is_available,$is_show_on_main)
{
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "update movies set name='".$name."',genre='".$genre."',description='".$description."',actors='".$actors."',year_='".$year_."',img_url='".$img_url."',is_available=".$is_available.",is_show_on_main=".$is_show_on_main." where idm =".$idm." ;";
	$conn->query($sql);
	mysqli_error($conn);
	$conn->close();
}
function get_old_img_url($idmov)
{
	$data_conf = get_DB_config();
	$conn = new mysqli($data_conf[0],$data_conf[1],$data_conf[2],$data_conf[3]);
	$sql = "select img_url from movies where idm = ".$idmov.";";
	$result = $conn->query($sql);
	$res = "./img/movies/";
	if($row = $result->fetch_assoc()){
		$res = $row['img_url'];
	}
	$conn->close();
	return $res;
}

function main()
{
	$img_url = "";
	$data = $_POST["x"];
	$data = json_decode($data);
	
	if(isset($_FILES['img'])){
		$img = $_FILES['img'];
		//$img_path = $_SERVER['DOCUMENT_ROOT'] . '/index/img/movies/'.$image['name']; // free hosting
		$img_path = $_SERVER['DOCUMENT_ROOT'] . '/LTScinemaV2/index/img/movies/'.$img['name']; // localhost
		$img_url = './img/movies/'.$img['name'];
		move_uploaded_file($img['tmp_name'],$img_path);
	}else{
		$img_url = get_old_img_url($data->idm);
	}
	
	editMovie($data->name,$data->genre,$img_url,$data->actors,$data->year_,$data->description,$data->idm,$data->is_available,$data->is_show_on_main);
	
	echo "dsfsd##0";
}
main();
?>