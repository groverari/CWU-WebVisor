<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';


    // // Adds a replacement class to a program.
    // function addReplacement($user_id, $program_id, $replaced_id, $replacement_id) {
    //     $query = "INSERT INTO " . $this->table . " (program_id, required_id, replacement_id) VALUES (?, ?, ?)";
    //     $this->db->add_db($query, [$program_id, $replaced_id, $replacement_id]);

    //     $note = "Added <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
    //     $this->record_update_program($user_id, $program_id, $note);
    // }

    // // Removes a replacement class from a program.
    // function removeReplacement($user_id, $program_id, $replaced_id, $replacement_id) {
    //     $query = "DELETE FROM " . $this->table . " WHERE program_id = ? AND required_id = ? AND replacement_id = ?";
    //     delete_from_db($query, [$program_id, $replaced_id, $replacement_id]);

    //     $note = "Removed <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
    //     $this->record_update_program($user_id, $program_id, $note);
    // }

    function get_replacement_classes($program_id)
	{
		$replacement_classes = array();
		$query_string = "
		SELECT
			replacement_classes.required_id,
			replacement_classes.replacement_id,
			Req.name AS required_name,
			Rep.name AS replacement_name,
			replacement_classes.note AS note
		FROM
			replacement_classes JOIN classes AS Rep ON replacement_classes.replacement_id=Rep.id JOIN classes AS Req ON replacement_classes.required_id = Req.id
		WHERE
			replacement_classes.program_id=:program_id
		;";
		$dataArr = [':program_id'=>$program_id];
		$result = get_from_db($query_string, $dataArr);
		
		foreach ($result as $row)
		{
			$required_id = $row['required_id'];
			$required_name = $row['required_name'];
			$replacement_id = $row['replacement_id'];
			$replacement_name = $row['replacement_name'];
			$note = $row['note'];
			if (!isset($replacement_classes[$required_id]))
			{
				$replacement_classes[$required_id] = array('name' => $required_name);
				$replacement_classes[$required_id]['replacements'] = array();
			}
			$replacement_classes[$required_id]['replacements'][] = array('id' => $replacement_id, 'name' => $replacement_name, 'note' => $note);
		}
		
		return $replacement_classes;
	}


