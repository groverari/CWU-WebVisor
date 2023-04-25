<?php 
    //This method executes any add query to the database
    //$query is a formatted string according to PDO rules
    //$data array is an associative array of all the variables to include in the query


    //Returns True or false depending on success
    function add_db($db, $query, $data_array = []){
        //global $db;
        return $db-> prepare($query)->execute($data_array);
    }

    //Returns rows affected
    function add_db_rows($db, $query, $data_array = []){
        //global $db;
        $statement =  $db-> prepare($query);
        $statement->execute($data_array);
        return $statement -> rowCount();
        
    }

    function get_from_db($db, $query, $data_array = []){
        //global $db;
        $statement = $db-> prepare($query);
        $statement->execute($data_array);
        $return_vals = $statement->fetchAll();
        return $return_vals;
    }