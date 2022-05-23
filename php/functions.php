<?php
include_once "cors.php";
include_once "db_connection2.php";

function getAllContent()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, year, title, sinopsis, platform, director, leading_cast, genre, content_type, image, rating FROM tContent");
    return $sentencia->fetchAll();
}
function getAllUsers()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, name, surname, email,description, is_admin,profile_image FROM tUser");
    return $sentencia->fetchAll();
}

function getAllSugg()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, year, title, platform FROM tSuggestion");
    return $sentencia->fetchAll();
}
function getSuggestion($title)
{
    $db = get_db_connection_or_die();
	$sentencia = $db->prepare("SELECT id, year, title, platform FROM tSuggestion where title = ?");
    $sentencia->execute([$title]);
    return $sentencia->fetchObject();
}
function newSuggestion($sugg)
{
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("INSERT INTO tSuggestion (year, title, platform) VALUES (?, ?, ?)");
    return $sentencia->execute([$sugg->year, $sugg->title,$sugg->platform]);
}
function getAllComments()
{
    $db = get_db_connection_or_die();
	$sentencia = $db->query("SELECT id, content_id, user_id, comment,rating FROM tCommentRating");
    return $sentencia->fetchAll();
}

function newComment($comment)
{
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("INSERT INTO tCommentRating (content_id,user_id,comment, rating) VALUES (?, ?, ?, ?)");
    return $sentencia->execute([$comment->content_id, $comment->user_id,$comment->comment,$comment->rating]);
}

function updateUser($user)
{
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("UPDATE tUser SET name = ?, surname = ?, description = ? WHERE id = ?");
    return $sentencia->execute([$user->name, $user->surname, $user->description, $user->id]);
}

function getFavsUser($id)
{
    $db = get_db_connection_or_die();
	$sentencia = $db->prepare("SELECT content_id FROM tFavorites where user_id = ?");
    $sentencia->execute([$id]);

    return $sentencia->fetchAll();
}

function registerUser($user)
{
    $password=password_hash($user->password, PASSWORD_BCRYPT);
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("INSERT INTO tUser (name, surname, email,encrypted_password,description,profile_image) VALUES (?, ?, ?, ?, ?, ?)");
    return $sentencia->execute([$user->name, $user->surname,$user->email,$password,$user->description,""]);
}
function delFav($user_id,$content_id)
{
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("DELETE FROM tFavorites WHERE user_id = ? AND content_id = ?");
    return $sentencia->execute([$user_id,$content_id]);
}
function newFav($fav)
{
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("INSERT INTO tFavorites (content_id,user_id) VALUES (?, ?)");
    return $sentencia->execute([$fav->content_id, $fav->user_id]);
}

function logUser($user){
    // $password=password_hash($user->password, PASSWORD_BCRYPT);
    $bd = get_db_connection_or_die();
    $sentencia = $bd->prepare("SELECT id,encrypted_password FROM tUser where email = ?");
     $sentencia->execute([$user->email]);
     $result = $sentencia->fetch(PDO::FETCH_BOTH);
     if (password_verify($user->password, $result[1])) {
        session_start();
        $_SESSION['user_id'] = $result[0];
        return $result[0];
        exit;
    } else {
        header("Location: logUser.php?login_failed_password=True");
        exit;
    }


}

    // $sentencia = $bd->prepare("INSERT INTO tUser (name, surname, email,encrypted_password,description,profile_image) VALUES (?, ?, ?, ?, ?, ?)");
    // return $sentencia->execute([$user->name, $user->surname,$user->email,$password,$user->description,""]);


?>