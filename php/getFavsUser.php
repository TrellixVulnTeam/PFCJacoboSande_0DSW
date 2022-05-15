<?php
include_once "cors.php";
include_once "functions.php";
$content = getFavsUser($id);
echo json_encode($content);
?>