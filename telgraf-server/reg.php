<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$username = $_arr["username"];
$password = $_arr["password"];

$hashedpass = password_hash($password, PASSWORD_DEFAULT);
$usertoken = password_hash($username, PASSWORD_DEFAULT);


$sql = "INSERT INTO users(username, password, usertoken) VALUES ('$username', '$hashedpass', '$usertoken')";

if (!searchUser($username)) {
    if (mysqli_query($connect, $sql) === TRUE) {
        echo json_encode("Başarıyla kayıt oldun!");
    } else {
        echo json_encode("Bir hata oluştu.");
    }
} else {
    echo json_encode("Böyle bir kullanıcı mevcut.");
}


