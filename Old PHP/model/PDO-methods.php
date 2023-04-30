<?php 
    //This method executes any add query to the database
    //$query is a formatted string according to PDO rules
    //$data array is an associative array of all the variables to include in the query

    include '../config/Database.php';
    //Returns True or false depending on success
    function add_db( $query, $data_array = []){
        global $db;
        return $db-> prepare($query)->execute($data_array);
    }

    function remove_db($query, $data_array = [])
    {
        return add_db($query, $data_array);
    }

    //Returns rows affected
    function add_db_rows($query, $data_array = []){
        global $db;
        $statement =  $db-> prepare($query);
        $statement->execute($data_array);
        return $statement -> rowCount();
        
    }

    //Returns rows affected
    function remove_db_rows($query, $data_array = [])
    {
        return add_db_rows($query, $data_array);
    }

    function get_from_db( $query, $data_array = []){
        global $db;
        $statement = $db-> prepare($query);
        $statement->execute($data_array);
        $return_vals = $statement->fetchAll();
        return $return_vals;
    }

    function get_from_db_rows( $query, $data_array = [])
    {
        global $db;
        $statement = $db-> prepare($query);
        $statement->execute($data_array);
        return $statement->rowCount();
    }