<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';


    // Retrieves all notes for a given student.
    function get_notes($student_id) 
    {
        $query = "SELECT notes.id, datetime, note, flagged, name 
                  FROM notes JOIN users ON notes.user_id=users.id 
                  WHERE notes.student_id=:student_id ORDER BY notes.flagged, notes.datetime DESC";
        $notes = get_from_db($query, ['student_id'=>$student_id]);

        $formatted_notes = array();
        foreach ($notes as $row) 
        {
            if ($row['name'] == '') 
            {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime']));
            } 
            else 
            {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime'])) . " &mdash; " . $row['name'];
            }
            $note = $row['note'];
            $flagged = $row['flagged'];
            $formatted_notes[$row['id']] = array('tag' => $tag, 'note' => $note, 'flagged' => $flagged);
        }

        return $formatted_notes;
    }

    function add_note($user_id, $student_id, $note, $flagged)
	{	
		$note = '';
		
		$flagged_text = ($flagged ? 'Yes' : 'No');
		$query_string = "
		INSERT INTO notes
			(user_id, student_id, note, flagged, datetime)
		VALUES
			(:user_id, :student_id, :note, :flagged_text, NOW())
		";
        $dataArr = [':user_id'=>$user_id, ':student_id'=>$student_id, ':note'=>$note, ':flagged_text'=>$flagged_text];
		$query_result_id = add_db_id($query_string, $dataArr);;
		
		
		if ($query_result_id > 0)
		{
			$note = "<note:$query_result_id> added to <student:$student_id>.";
            $journ = new Journals();
			$journ->record_update_student($user_id, $student_id, $note);
		}
	}

    // Updates all notes for a given student to remove any existing flags, then adds flags to the notes specified in the array.
    function update_notes($student_id, $flagged_ids)
	{
		
		global $link; $query_string = "
		UPDATE notes
		SET
			flagged='No'
		WHERE
			student_id=:student_id
		;";
        $dataArr = [':student_id'=>$student_id];
		$query_result = add_db($query_string, $dataArr);
		
		foreach ($flagged_ids as $flagged_id)
		{
			$query_string = "
			UPDATE notes
			SET
				flagged='Yes'
			WHERE
				id=:flagged_id
			;";
            $dataArr = [':flagged_id'=>$flagged_id];
			$query_result = add_db($query_string, $dataArr);
		}
	}

