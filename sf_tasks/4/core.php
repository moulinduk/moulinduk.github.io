<?php
ob_start();
session_start();
$current_file = $_SERVER['SCRIPT_NAME'];
if (isset($_SERVER['HTTP_REFERER'])) $http_referer = $_SERVER['HTTP_REFERER'];
function test_input($data) 
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
function loggedIn()
{
    return (isset($_SESSION['user_id']) && !empty($_SESSION['user_id']));
}
?>