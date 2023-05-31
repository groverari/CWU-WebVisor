
<?php
include_once 'pdo-methods.php';


      // clears all checklists for a given student and program id.
      function clear_checklist($user_id, $student_id, $program_id)
	{
		$query_string = "
		DELETE
			student_checklists
		FROM
			student_checklists JOIN checklists ON student_checklists.checklist_id=checklists.id
		WHERE
			student_id=:student_id
			AND
			program_id=:program_id
		;";
        $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
		$query_result = add_db_rows($query_string, $dataArr);;
		
		if ($query_result > 0)
		{
			$note = "Cleared <student:$student_id> checklists for <program:$program_id>.";
			$journ = new Journals();
            $journ->record_update_student($user_id, $student_id, $note);
		}
	}

    // checks a given checklist item for a given student.
    function check_checklist($user_id, $student_id, $checklist_id)
	{
		$query_string = "
		INSERT INTO
			student_checklists(checklist_id, student_id)
		VALUES
			(:checklist_id, :student_id)
		;";
        $dataArr = [':checklist_id'=>$checklist_id, ':student_id'=>$student_id];
		$query_result = add_db_rows($query_string, $dataArr);;
		
		if ($query_result > 0)
		{
			$note = "Checked <checklist_item:$checklist_id> for <student:$student_id>.";
			$journ = new Journals();
            $journ->record_update_student($user_id, $student_id, $note);
		}
	}

    // updates all checklists for a given student and program id, based on an array of checklist ids.
    function update_checklist($user_id, $student_id, $program_id, $checklist_ids)
    {
        clear_checklist($user_id, $student_id, $program_id);
        
        foreach ($checklist_ids as $checklist_id)
        {
            check_checklist($user_id, $student_id, $checklist_id);
        }
    }
    //retrive a list of checked checklist items for  a given student and program
    function get_checked_items($student_id, $program_id)
	{
        $query_string = "
        SELECT
            student_checklists.checklist_id
        FROM
            student_checklists JOIN checklists ON student_checklists.checklist_id=checklists.id
        WHERE
            student_id=:student_id
            AND
            program_id=:program_id
        ;";
        $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
        $query_result = get_from_db($query_string, $dataArr);;
        
        $checked_items = array();
        foreach ($query_result as $row)
        {
            $checked_items[] = $row['checklist_id'];
        }
        
        return $checked_items;
    }