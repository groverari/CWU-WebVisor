<?php
/*TODO has many parameters need to figure out if this should be implemented or not
    Every parameter is optional and you never know if the line in the db has all the elements
    The parameters can be replaced This can be updated when we have more information
*/
function get_journal( $user_id, $student_id, $class_id, $program_id, $major_id){
    global $db;
    $query = "
    SELECT
        Journal.date,
        Users.name AS user_name,
        CONCAT(Students.last, \", \", Students.first) AS student_name,
        Classes.name AS class_name,
        Programs.year AS program_name,
        Majors.name AS major_name,
        note
    FROM 
        journal as j
        LEFT JOIN users ON journal.user_id=Users.id
        LEFT JOIN students ON journal.student_id=Students.id
        LEFT JOIN classes ON journal.class_id=Classes.id
        LEFT JOIN programs ON journal.program_id=Programs.id
        LEFT JOIN majors ON journal.major_id=Majors.id
    ORDER BY
        date DESC
    LIMIT
        100;
    ";

   $journals = get_from_db($query);
   if(!$journals){
    $error = "Could not get the journals from database";
    include("../errors/error.php");
   }
   else return $journals;
}

function record_update_major($user_id, $major_id, $note){
    
    $query = "INSERT INTO journal (user_id, major_id, note)
                VALUES (:user_id, :major_id, :note)";
    $data_array = [":user_id" =>$user_id, ":major_id" => $major_id, ":note"=> $note];
    $success = add_db($query, $data_array);
    if(!$success){
        $error = "Could not update journal";
        include("../errors/error.php");
        return false;
    }
    else return true;
}

function record_update_program($user_id, $program_id, $note){
    global $db;
    $query = "INSERT INTO journal (user_id, program_id, note)
                VALUES (:user_id, :program_id, :note)";
    $data_array = [":user_id" =>$user_id, ":program_id" => $program_id, ":note"=> $note];
    $success = add_db($query, $data_array);
    if(!$success){
        $error = "Could not update journal";
        include("../errors/error.php");
        return false;
    }
    else return true;
}

function record_update_class($user_id, $class_id, $note){
    global $db;
    $query = "INSERT INTO journal (user_id, class_id, note)
                VALUES (:user_id, :class_id, :note)";
   $data_array = [":user_id" =>$user_id, ":class_id" => $class_id, ":note"=> $note];
   $success = add_db($query, $data_array);
   if(!$success){
       $error = "Could not update journal";
       include("../errors/error.php");
       return false;
   }
   else return true;
    
}

function record_update_student($user_id, $student_id, $note){
    global $db;
    $query = "INSERT INTO journal (user_id, student_id, note)
                VALUES (:user_id, :student_id, :note)";
    $data_array = [":user_id" =>$user_id, ":student_id" => $student_id, ":note"=> $note];
    $success = add_db($query, $data_array);
    if(!$success){
        $error = "Could not update journal";
        include("../errors/error.php");
        return false;
    }
    else return true;
    
}