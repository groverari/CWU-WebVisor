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


//This method executes any add query to the database
//$query is a formatted string according to PDO rules
//$data array is an associative array of all the variables to include in the query
function add_db($query, $data_array = []){
    global $db;
    return $statement = $db-> prepare($query)->execute($data_array);

}

function get_from_db($query, $data_array){
    global $db;
    $statement = $db-> prepare($query);
    $statement->execute($data_array);
    $return_vals = $statement->fetchAll();
    return $return_vals;
}