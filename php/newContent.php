<?php
include_once "cors.php";
$content = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = newContent($content);
echo ($resultado);
?>