<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Checklists 
{
    private $db;
    private $table = 'checklists';


    function add_checklist_item($user_id, $program_id, $name)
	{
		$query_string = "
			SELECT
				COUNT(id) AS count
			FROM
				checklists
			WHERE
				program_id=:program_id
			;";
        $dataArr = [':program_id'=>$program_id];
		$query_result = get_from_db($query_string, $dataArr);
		$count = $query_result['count'];
		$sequence = $count + 1;
		
		$query_string = "
			INSERT INTO
				checklists(program_id, name, sequence)
			VALUES
				(:program_id, ':name', :sequence)
			;";
        $dataArr =[':program_id'=>$program_id, ':name'=>$name, ':sequence'=>$sequence];
		$query_result_row = add_db_rows($query_string, $dataArr);
		
		if ($query_result_row > 0)
		{
            $journ = new Journals();
			$note = "Added item to <checklist:$count> for <program:$program_id>.";
			$journ->record_update_program($user_id, $program_id, $note);
		}
	}

    function get_checklist($program_id)
	{
		$checklist = array();

		$query_string = "
		SELECT
			id, name, sequence
		FROM
			checklists
		WHERE
			program_id=:program_id
		ORDER BY
			sequence ASC
		;";
        $dataArr = [':program_id'=>$program_id];
		$query_result = get_from_db($query_string, $dataArr);
		
		foreach ($query_result as $row)
		{
			$checklist[$row['id']] = $row;
		}
		
		return $checklist;
	}

    function update_checklist_sequence($user_id, $program_id, $checklist_items)
	{
		$changes = 0;
		
		asort($checklist_items);
		$max_checklist_count = 1000;
		
		$query_string = "
			UPDATE
				checklists
			SET
				sequence=sequence+:max_checklist_count
			WHERE
				program_id=:program_id
			;";
        $dataArr= [':max_checklist_count'=>$max_checklist_count, ':program_id'=>$program_id];
		$query_result_row = add_db_rows($query_string, $dataArr);
		$changes += $query_result_row;
		
		$i = 1;
        $checklist_id = 0;
		foreach ($checklist_items as $id => $sequence)
		{
			if ($sequence > 0)
			{
                $id = 
				$query_string = "
				UPDATE
					checklists
				SET
					sequence = :i
				WHERE
					id=:id
				;";
                $checklist = $id;
                $dataArr = [':id'=>$id, ':i'=>$i];
				$query_result_row = add_db_rows($query_string, $dataArr);
				$changes += $query_result_row;
				++$i;
			}
		}
		
		$query_string = "
			DELETE FROM
				checklists
			WHERE
				sequence > :max_checklist_count
			;";
            $dataArr = [':max_checklist_count'=>$max_checklist_count];
			$query_result_rows = remove_db_rows($query_string, $dataArr);
			$changes += $$query_result_rows;
			
		if ($changes > 0)
		{
            $journ = new Journals();
			$note = "Updated <checklist:$checklist_id> for <program:$program_id>.";
			$journ->record_update_program($user_id, $program_id, $note);
		}
	}
}


