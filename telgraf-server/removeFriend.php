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

// Remove friend from current user's list
$currentFriends = isset($currentUser['friends']) ? trim($currentUser['friends']) : '';
$friendIds = array_filter(explode(" ", $currentFriends));
$friendIds = array_diff($friendIds, [(string)$friendId]);
$newFriends = implode(" ", $friendIds);

$sql1 = "UPDATE users SET friends = '" . mysqli_real_escape_string($connect, $newFriends) . "' WHERE id = $currentUserId";

// Remove current user from friend's list (mutual removal)
$friendData = mysqli_fetch_array(mysqli_query($connect, "SELECT friends FROM users WHERE id = $friendId"), MYSQLI_ASSOC);
$friendFriends = isset($friendData['friends']) ? trim($friendData['friends']) : '';
$friendFriendIds = array_filter(explode(" ", $friendFriends));
$friendFriendIds = array_diff($friendFriendIds, [(string)$currentUserId]);
$newFriendFriends = implode(" ", $friendFriendIds);

$sql2 = "UPDATE users SET friends = '" . mysqli_real_escape_string($connect, $newFriendFriends) . "' WHERE id = $friendId";

if (mysqli_query($connect, $sql1) && mysqli_query($connect, $sql2)) {
    echo json_encode(["success" => true, "message" => "Arkadaşlıktan çıkarıldı."]);
} else {
    echo json_encode(["success" => false, "message" => "Bir hata oluştu."]);
}

