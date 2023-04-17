<?php 
//This method executes any add query to the database
//$query is a formatted string according to PDO rules
//$data array is an associative array of all the variables to include in the query



function add_db($query, $data_array = []){
global $db;
return $db-> prepare($query)->execute($data_array);

}

function add_db_rows($query, $data_array = []){
    global $db;
    $statement =  $db-> prepare($query);
    $statement->execute($data_array);
    return $statement -> rowCount();
    
    }

function get_from_db($query, $data_array = []){
global $db;
$statement = $db-> prepare($query);
$statement->execute($data_array);
$return_vals = $statement->fetchAll();
return $return_vals;
}