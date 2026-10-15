<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$usertoken = $_arr["usertoken"];
$friendId = (int)$_arr["friendId"];

// Get current user
$currentUser = searchUserByToken($usertoken);

if (!$currentUser) {
    echo json_encode(["success" => false, "message" => "Geçersiz oturum."]);
    exit;
}

$currentUserId = $currentUser['id'];

// Check if friend exists
$friendUser = searchUserByID($friendId);
if (!$friendUser) {
    echo json_encode(["success" => false, "message" => "Kullanıcı bulunamadı."]);
    exit;
}

// Check if already friends
$currentFriends = isset($currentUser['friends']) ? trim($currentUser['friends']) : '';
$friendIds = array_filter(explode(" ", $currentFriends));

if (in_array((string)$friendId, $friendIds)) {
    echo json_encode(["success" => false, "message" => "Bu kullanıcı zaten arkadaşınız."]);
    exit;
}

// Can't add yourself
if ($currentUserId == $friendId) {
    echo json_encode(["success" => false, "message" => "Kendinizi arkadaş olarak ekleyemezsiniz."]);
    exit;
}

// Add friend to current user's friend list
$newFriends = trim($currentFriends . " " . $friendId);
$sql1 = "UPDATE users SET friends = '" . mysqli_real_escape_string($connect, $newFriends) . "' WHERE id = $currentUserId";

// Add current user to friend's friend list (mutual friendship)
$friendData = mysqli_fetch_array(mysqli_query($connect, "SELECT friends FROM users WHERE id = $friendId"), MYSQLI_ASSOC);
$friendFriends = isset($friendData['friends']) ? trim($friendData['friends']) : '';
$newFriendFriends = trim($friendFriends . " " . $currentUserId);
$sql2 = "UPDATE users SET friends = '" . mysqli_real_escape_string($connect, $newFriendFriends) . "' WHERE id = $friendId";

if (mysqli_query($connect, $sql1) && mysqli_query($connect, $sql2)) {
    echo json_encode(["success" => true, "message" => "Arkadaş eklendi!"]);
} else {
    echo json_encode(["success" => false, "message" => "Bir hata oluştu."]);
}

