<?php 
require "connect.php"; 
require 'core.php';
if (loggedIn()) include 'home.php';
else include 'login.php';
?>