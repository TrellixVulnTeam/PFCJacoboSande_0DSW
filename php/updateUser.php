<?php
include_once "cors.php";
$user = json_decode(file_get_contents("php://input"));
include_once "functions.php";
$resultado = updateUser($user);
echo json_encode($resultado);