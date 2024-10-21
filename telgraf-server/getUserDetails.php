<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$usertoken = $_arr["usertoken"];

if (searchUserByToken($usertoken) != false) {
    echo json_encode(searchUserByToken($usertoken));
} else {
    echo json_encode("USER NOT FOUND");
}

