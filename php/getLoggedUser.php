<?php
include_once "cors.php";
session_start();
if (isset($_SESSION['user_id'])) {
    
    $id = $_SESSION['user_id'];
  }else{
      $id = 0;
  }

echo json_encode($id);
?>