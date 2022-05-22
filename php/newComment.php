<?php
include_once "cors.php";
$comment = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = newComment($comment);
echo ($resultado);