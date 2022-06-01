<?php
include_once "cors.php";
include_once "functions.php";
$content = getAllComments();
echo json_encode($content);
?>