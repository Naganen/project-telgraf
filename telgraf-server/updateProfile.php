<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$usertoken = $_arr["usertoken"];

// Verify user
$currentUser = searchUserByToken($usertoken);
if (!$currentUser) {
    echo json_encode(["success" => false, "message" => "Geçersiz oturum."]);
    exit;
}

$userId = $currentUser['id'];

// Fields that can be updated
$allowedFields = ['display_name', 'bio', 'cover_image', 'global_tag', 'about'];
$updates = [];

foreach ($allowedFields as $field) {
    if (isset($_arr[$field])) {
        $value = mysqli_real_escape_string($connect, $_arr[$field]);
        $updates[] = "$field = '$value'";
    }
}

if (empty($updates)) {
    echo json_encode(["success" => false, "message" => "Güncellenecek alan bulunamadı."]);
    exit;
}

$updateStr = implode(", ", $updates);
$sql = "UPDATE user_profiles SET $updateStr WHERE user_id = $userId";

if (mysqli_query($connect, $sql)) {
    echo json_encode(["success" => true, "message" => "Profil güncellendi!"]);
} else {
    echo json_encode(["success" => false, "message" => "Bir hata oluştu."]);
}

