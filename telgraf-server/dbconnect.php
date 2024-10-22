<?php

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "123qweasd";
$dbname = "db";

$connect = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

function searchUser($user)
{
    global $connect;
    $sql = "SELECT * FROM users WHERE username = '$user'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if ($count == 1) {
        return true;
    } else {
        return false;
    }
}

function searchUserByID($userid)
{
    global $connect;
    $sql = "SELECT * FROM users WHERE id = $userid";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if ($count == 1) {
        return $row;
    } else {
        return false;
    }
}

function searchUserByToken($token) {
    global $connect;
    $sql = "SELECT * FROM users WHERE usertoken = '$token'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if ($count == 1) {
        return $row;
    } else {
        return false;
    }
}

function checkPass($user, $pass)
{
    global $connect;
    $sql = "SELECT * FROM users WHERE username = '$user'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);

    if (searchUser($user) && password_verify($pass, $row['password'])) {
        return true;
    } else {
        return false;
    }
}

function getUser($user) {
    global $connect;
    $sql = "SELECT * FROM users WHERE username = '$user'";
    $result = mysqli_query($connect, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    if (searchUser($user)) {
        return $row;
    } else {
        return "";
    }
}