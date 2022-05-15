<?php
include_once "cors.php";
include_once "functions.php";
$content = getAllUsers();
echo json_encode($content);
?>