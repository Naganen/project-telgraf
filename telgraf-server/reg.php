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

if (strlen($username) > 14) {
    echo json_encode("Kullanıcı adı 14 karakteri geçemez.");
} else {
    if (!searchUser($username)) {
        if (mysqli_query($connect, $sql) === TRUE) {
            // Yeni kullanıcı için varsayılan profil oluştur
            $newUserId = mysqli_insert_id($connect);
            $escapedUsername = mysqli_real_escape_string($connect, $username);
            $profileSql = "INSERT INTO user_profiles (user_id, display_name, bio, cover_image, global_tag, about) 
                           VALUES ($newUserId, '$escapedUsername', 'Merhaba! Telgraf kullanıyorum.', '/default_cover.jpg', '#yeni', '{\"konum\": \"\", \"dogumTarihi\": \"\", \"websitesi\": \"\"}')";
            mysqli_query($connect, $profileSql);
            echo json_encode("Başarıyla kayıt oldun!");
        } else {
            echo json_encode("Bir hata oluştu.");
        }
    } else {
        echo json_encode("Böyle bir kullanıcı mevcut.");
    }
}




