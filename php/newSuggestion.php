<?php
include_once "cors.php";
$sugg = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = newSuggestion($sugg);
echo ($resultado);