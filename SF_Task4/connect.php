<?php

$server = "localhost";
$username = "root";
$password = "";

$database = "mydatabase";

$linkSQL = @mysqli_connect($server, $username, $password);
if (!$linkSQL) die("Could not connect to SQL");

$linkDB = @mysqli_select_db($linkSQL, $database);
if (!$linkDB) die("Could not connect to database");

?>