<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$userId = (int)$_arr["userId"];

// Get user basic info
$userInfo = searchUserByID($userId);

if (!$userInfo) {
    echo json_encode(["error" => "Kullanıcı bulunamadı."]);
    exit;
}

// Get profile info from user_profiles table
$sql = "SELECT * FROM user_profiles WHERE user_id = $userId";
$result = mysqli_query($connect, $sql);
$profile = mysqli_fetch_array($result, MYSQLI_ASSOC);

// If no profile exists yet, create a default one
if (!$profile) {
    $displayName = mysqli_real_escape_string($connect, $userInfo['username']);
    $insertSql = "INSERT INTO user_profiles (user_id, display_name, bio, cover_image, global_tag, about) 
                  VALUES ($userId, '$displayName', 'Merhaba! Telgraf kullanıyorum.', '/default_cover.jpg', '#yeni', '{\"konum\": \"\", \"dogumTarihi\": \"\", \"websitesi\": \"\"}')";
    mysqli_query($connect, $insertSql);
    
    $result = mysqli_query($connect, $sql);
    $profile = mysqli_fetch_array($result, MYSQLI_ASSOC);
}

// Merge user info with profile info
$response = [
    "id" => $userInfo['id'],
    "username" => $userInfo['username'],
    "pp" => $userInfo['pp'],
    "display_name" => $profile['display_name'],
    "bio" => $profile['bio'],
    "cover_image" => $profile['cover_image'],
    "global_tag" => $profile['global_tag'],
    "about" => $profile['about']
];

echo json_encode($response);

