<?php
include_once "cors.php";
include_once "functions.php";
$content = getAllFavs();
echo json_encode($content);
?>