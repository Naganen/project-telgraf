<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json; charset=utf-8');

include "dbconnect.php";

$content = trim(file_get_contents("php://input"));
$_arr = json_decode($content, true);
$searchQuery = $_arr["query"];
$usertoken = $_arr["usertoken"];

// Get the searching user's info so we can exclude them from results
$currentUser = searchUserByToken($usertoken);

if (!$currentUser) {
    echo json_encode(["error" => "Geçersiz oturum."]);
    exit;
}

$currentUserId = $currentUser['id'];
$currentFriends = isset($currentUser['friends']) ? $currentUser['friends'] : '';

// Search for users whose username contains the query (case-insensitive)
$searchQuery = mysqli_real_escape_string($connect, $searchQuery);
$sql = "SELECT id, username, pp FROM users WHERE username LIKE '%$searchQuery%' AND id != $currentUserId LIMIT 10";
$result = mysqli_query($connect, $sql);

$users = array();
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
    // Check if this user is already a friend
    $friendIds = array_filter(explode(" ", $currentFriends));
    $row['isFriend'] = in_array((string)$row['id'], $friendIds);
    $users[] = $row;
}

echo json_encode($users);

