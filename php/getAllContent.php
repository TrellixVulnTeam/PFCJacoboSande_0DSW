<?php
include_once "cors.php";
include_once "functions.php";
$content = getAllContent();
echo json_encode($content);
?>