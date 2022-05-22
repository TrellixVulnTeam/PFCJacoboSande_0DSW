<?php
include_once "cors.php";
include_once "functions.php";
if (!isset($_GET["title"])) {
    echo json_encode(null);
    exit;
}
$title = $_GET["title"];
$content = getSuggestion($title);
echo json_encode($content);
?>