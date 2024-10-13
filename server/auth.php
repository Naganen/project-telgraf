<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$username = $_arr["username"];
$password = $_arr["password"];

if (checkPass($username, $password)) {
    echo json_encode("OK " . getUser($username)['token']);
} else {
    echo json_encode("Kullanıcı adı ve ya şifre yanlış.");
}

