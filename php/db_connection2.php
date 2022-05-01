<?php
  /**
   * Returns a mysqli object or prints a full HTML error page and ceases execution.
   */
  function get_db_connection_or_die() {
    $database = new PDO('mysql:host=localhost;dbname=mycinemalistdb,admin,admin');
    $database->query("set names utf8;");
    $database->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    return $database;
  }
?>
