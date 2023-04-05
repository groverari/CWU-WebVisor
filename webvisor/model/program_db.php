<?php

function get_program_id($major_id, $catalog_year){
    global $db;
    $query = "SELECT id FROM programs
                WHERE major_id = :major_id
                    AND year = :year";
    $statement = $db->prepare($query);
    $statement->bindValue(":major_id", $major_id);
    $statement->bindValue(":year", $catalog_year);
    $statement->execute();
    $program = $statement->fetch();
    $statement->closeCursor();
}

/*TODO the original code adds user programs 
and concats them to the to the all programs table. 
There is also a student programs table  
IMPORTANT!! I have left the user program code out for now. W
I will add it if it I find out its needed.
*/
function all_programs($user_id){
    global $db; 
    $query = "SELECT p.id, name, year
                FROM programs
                JOIN majors ON p.major_id = majors.id
                ORDER BY name";
    $statement = $db->prepare($query);
    $statement->execute();
    $programs = $statement->fetchAll();
    $statement-> closeCursor();
    return $programs;
}

function get_program_info($program_id){
    global $db;
    $query = "SELECT p.id, p.major_id, p.year, p.credits, p.electives, p.active, m.name 
                FROM programs p 
                JOIN majors m ON p.major_id = m.id
                WHERE p.id = :program_id";
    $statement = $db-> prepare($query);
    $statement->bindValue(":program_id", $program_id);
    $statement-> execute();
    $program = $statement->fetch();

    if(!$program){
        $error= "Could not get program info";
        include("../errors/error.php");

    }
    else return $program;
}

function get_program_roster($program_id){
    global $db;
    $query = "SELECT
                s.last,
                s.first,
                CONCAT("
}