<?php
include_once "cors.php";

require __DIR__. 'db_connection.php';


function getAllContent()
{
    $db = get_db_connection_or_die();
	$query = "SELECT id, year, title, sinopsis,platform, director, leading_cast, genre, content_type, image, rating FROM tContent";
	// Hacemos la consulta a la base de datos con es Query y si da error nos redirige al login.php?login_failed_unknown=True.
	$result = mysqli_query($db, $query) or die("Failed Retrieving data");
	// Si entra en el if es que el email está correcto
    if (mysqli_num_rows($result) > 0) {
       
        return $result->fetch_all(MYSQLI_ASSOC);
       
    }
    mysqli_close($db);
}

?>