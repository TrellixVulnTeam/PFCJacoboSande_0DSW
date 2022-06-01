<?php
include_once "cors.php";
$user = json_decode(file_get_contents("php://input"));
include_once "functions.php";
if (isset($_GET['login_failed_password']) == 'True') {
    $result = "pwd";
    echo $result;
}else{
    $resultado = logUser($user);
echo json_encode($resultado);
}
