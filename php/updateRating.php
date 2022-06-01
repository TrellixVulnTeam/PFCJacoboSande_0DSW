<?php
include_once "cors.php";
$rating = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = updateRating($rating);
echo json_encode($resultado);