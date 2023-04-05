<?php
//Path to local Database hosted on localhost. the database is called advising
//username and password are default. This can change to whatever is required for wherever the db is hosted


$dsn = 'mysql:host=localhost;dbname=advising';

$username = 'ts_user';
$password = "";

//$db is a the connection to the database object
try{
    $db = new PDO($dsn, $username, $password);
}
catch(PDOException $e){
    $error_message = $e -> getMessage();
    include('../errors/database_error.php');
    exit();
}