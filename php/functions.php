<?php
include_once "cors.php";
include_once "db_connection2.php";

function getAllContent()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, year, title, sinopsis, platform, director, leading_cast, genre, content_type, image, rating FROM tContent");
    return $sentencia->fetchAll();
}

function getAllFavs()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, content_id,user_id FROM tFavorites");
    return $sentencia->fetchAll();
}

?>