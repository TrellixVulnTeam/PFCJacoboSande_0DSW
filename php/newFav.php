<?php
include_once "cors.php";
$fav = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = newFav($fav);
echo ($resultado);