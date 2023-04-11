<?php

function all_majors(){
    global $db;
    $query = "SELECT * FROM majors
            ORDER BY name";
   $majors = get_from_db($query);

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
    $data_array = [":active" => $active, ":name" => $name];
    $success = add_db($query, $data_array);
    $id = $db->lastInsertId();

    if(!$success){
        $error = "Could not add the new major";
        include("../errors/error.php");
    }
    else{
        $note = "<major:$id> added.";
		record_update_major($user_id, $id, $note);
        return true;
    }
}

//FUNCTIONALITY: updates the major name and active status 
// On success creates a journal entry
function update_major($user_id, $major_id, $name, $active)
	{		
        global $db;
		$query = "
			UPDATE Majors
			SET
				name= :name,
				active= :active
			WHERE
				id= :major_id";
        $data_array = [":name"=> $name, ":active"=> $active, ":major_id"=> $major_id];
        $rows = add_db_rows($query, $data_array);
        

		if ($rows > 0)
		{
			$note = "<major:$major_id> updated.";
			record_update_major($user_id, $major_id, $note);
            return true;
		}
        else{
            $error = "Could not update the major";
            include ('../errors/error.php');
            return false;
        }
        
	}
function get_major_info($major_id){
    $query = "Select name, active
                FROM majors
                WHERE id= :major_id";
    $major = get_from_db($query, [':major_id' => $major_id]);

    if($major == false){
        $error = "Could not get Major info";
        include("../errors/error.php");
    }
    else return $major;
}