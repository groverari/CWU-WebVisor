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
    $statement->bindValue(':name', $name);
    $statement->bindValue(':active', $active);
    $success = $statement->execute();
    $id = $db->lastInsertId();
    $statement->closeCursor();

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
		$statement = $db->prepare($query);
        $statement-> bindValue(":name", $name);
        $statement->bindValue(":active", $active);
        $statement-> bindValue(":major_id", $major_id);
        $statement-> execute();
        $rows = $statement->rowCount();
        $statement->closeCursor();


		if ($rows > 0)
		{
			$note = "<major:$major_id> updated.";
			record_update_major($user_id, $major_id, $note);
		}
        return true;
	}
function get_major_info($major_id){
    global $db;
    $query = "Select name, active
                FROM majors
                WHERE id= :major_id";
    $statement = $db->prepare($query);
    $statement->bindValue(":major_id", $major_id);
    $statement->execute();
    $major = $statement->fetch();
    $statement->closeCursor();

    if($major == false){
        $error = "Could not get Major info";
        include("../errors/error.php");
    }
    else return $major;
}