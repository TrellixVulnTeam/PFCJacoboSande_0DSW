<?php
include_once "cors.php";
include_once "functions.php";
$content = getAllSugg();
echo json_encode($content);
?>