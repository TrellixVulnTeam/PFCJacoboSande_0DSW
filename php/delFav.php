<?php
include_once "cors.php";
include_once "functions.php";
if (!isset($_GET["user_id"])) {
    echo json_encode(null);
    exit;
}
if (!isset($_GET["content_id"])) {
    echo json_encode(null);
    exit;
}
$user_id = $_GET["user_id"];
$content_id = $_GET["content_id"];

$content = delFav($user_id,$content_id);
echo json_encode($content);
?>