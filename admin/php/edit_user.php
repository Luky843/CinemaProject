<?php 
function get_DB_config()
{
	$myfile = fopen("db_configt.conf", "r");
	$content = fgets($myfile);
	fclose($myfile);
	$x = explode(";",$content);
	return $x;
}

function is_email_unique($email,$user_id)
{
	$is_uniqu = false;
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "select * from users where email like'".$email."' and idu != ".$user_id.";";
	$result = $conn->query($sql);
	if($row = $result->fetch_assoc()){
		$is_uniqu = false;
	}else{
		$is_uniqu = true;
	}
	$conn->close();
	return $is_uniqu;
}

function overwrite($id,$email,$admin,$blocked)
{
	$db_cr = get_DB_config();
	$conn = new mysqli($db_cr[0],$db_cr[1],$db_cr[2],$db_cr[3]);
	$sql = "update users set email='".$email."', isAdmin=".$admin.",isBlocked=".$blocked." where idu=".$id.";";
	$conn->query($sql);
	$conn->close();
}

function main()
{
	$data = $_GET["x"];
	$data = json_decode($data);
	var_dump($data);
	$is_uniqu = is_email_unique($data->email,$data->uid);
	var_dump($is_uniqu);
	if (!$is_uniqu || $data->admin == "" || $data->blocked == ""){
		echo "ads##-1";
		return;
	}
	overwrite($data->uid,$data->email,$data->admin,$data->blocked);
	echo "dsfsd##0";
}
main();

?>