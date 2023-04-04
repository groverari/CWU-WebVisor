<?php

function all_majors(){
    global $db;
    $query = "SELECT * FROM majors
            ORDER BY name";
    $statement = $db-> prepare($query);
    $statement->execute();
    $majors = $statement->fetchAll();
    $statement->closeCursor();

    if($majors == false){
        $error = "Could not find any majors";
        include("../errors/error.php");
    }
    else return $majors;
}

function add_major($user_id, $name, $active){
    global $db;
    $query = "INSERT INTO majors(name, active)
                VALUES(:name, :active)";
    
    $statement = $db->prepare($query);
    
}