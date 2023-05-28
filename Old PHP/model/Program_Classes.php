<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

	function get_program_classes($program_id)
	{
		$program_classes = array();
		$query_string = "
		SELECT
			classes.id,
			CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name_credits,
			classes.name,
			program_classes.minimum_grade,
			program_classes.sequence_no,
			program_classes.required
		FROM
			classes JOIN program_classes ON program_classes.class_id=classes.id
		WHERE
			program_classes.program_id=:program_id
		ORDER BY
			sequence_no, name ASC
		;";
		$dataArr = [':program_id'=>$program_id];

		$result = get_from_db($query_string, $dataArr);

		foreach($result as $row)
		{
			$id = $row['id'];
			$program_classes[$id] = $row;
		}

		return $program_classes;
	}

	function remove_class($user_id, $classID, $PID)
	{
		echo "im here in remove";
		$query = "
		DELETE FROM
			program_classes
		WHERE
			program_classes.class_id = :classID
			AND
			program_classes.program_id = :PID;
		";
		$dataArr = [':classID'=>$classID, ':PID'=>$PID];
		$result = remove_db_rows($query, $dataArr);
		if ($result > 0)
		{
            $journ = new Journals();
			$note = "Updated <program:$PID> classes.";
			$journ->record_update_program($user_id, $PID, $note);
		}
		echo "program classes removed";
		return "program classes removed";
	}
	function add_class($user_id, $classID, $PID, $minimum_grade, $required)
	{
		$query = "
		INSERT INTO program_classes 
			(program_id, class_id, minimum_grade, required)
		VALUES
			(:PID, :class_id, :mGrade, :required)
		;";
		$dataArr = [':class_id'=>$classID, ':PID'=>$PID, "mGrade"=>$minimum_grade, ":required"=>$required];
		$result = add_db_rows($query, $dataArr);
		if ($result > 0)
		{
            $journ = new Journals();
			$note = "Updated <program:$PID> classes.";
			$journ->record_update_program($user_id, $PID, $note);
		}
		return "program class added";
	}
	function update_classes()
	{

	}
    function get_required_classes($program_id, $required)
	{		
		$required_classes = array();
		$query_string = "
		SELECT
			classes.id,
			classes.id as CID,
			CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name_credits,
			classes.name,
			classes.credits,
			program_classes.minimum_grade,
			program_classes.sequence_no,
			program_classes.id as p_id
		FROM
			classes JOIN program_classes ON program_classes.class_id=classes.id
		WHERE
			program_classes.program_id = :program_id
			AND
			program_classes.required = :required
		ORDER BY
			classes.name ASC
		;";
        $dataArr =[':program_id'=>$program_id, ':required'=>$required];
		$result = get_from_db($query_string, $dataArr);
		$resultCount = get_from_db_rows($query_string, $dataArr);
		if($resultCount == 0)
		{
			return array();
		}
        foreach($result as $row)
        {
			$id = $row['id'];
			$required_classes[$id] = $row;
        }
		return $required_classes;
	}

    //remove global $YES and global $NO as variables and instead added them to parameters.
    //look in sql.php to see what's original
    function update_program_classes($user_id, $program_id, $core_ids, $required_ids, $required_grades, $sequence_numbers, $YES, $NO)
	{
		$changes = 0;
		
		$query_string = "
		DELETE FROM
			program_classes
		WHERE
			program_id=:program_id
		;";
        $dataArr = [':program_id'=>$program_id];
		$query_result = remove_db($query_string, $dataArr);
		
		foreach($core_ids as $class_id)
		{
			$query_string = "
			INSERT INTO program_classes
				(program_id, class_id, required)
			VALUES
				(:program_id, :class_id, :NO)
			;";
            $dataArr = [':program_id'=>$program_id, ':class_id'=>$class_id, ':NO'=>$NO];
			$query_result_rows = add_db_rows($query_string, $dataArr);
			
			$changes += $query_result_rows;
		}
		
		foreach ($required_ids as $required_id)
		{
			$query_string = "
			UPDATE program_classes
			SET required=:YES
			WHERE
				program_id=:program_id
				AND
				class_id=:required_id
			;";
            $dataArr =[':YES'=>$YES, ':program_id'=>$program_id, ':require_id'=>$required_id];
			$query_result_rows = add_db_rows($query_string, $dataArr);
			$changes += $query_result_rows;
		}
		
		foreach ($required_grades as $class_id => $minimum_grade)
		{
			if ($minimum_grade > 0)
			{
				$query_string = "
				UPDATE program_classes
				SET
					minimum_grade=:minimum_grade
				WHERE
					program_id=:program_id
					AND
					class_id=:class_id
				;";
				$dataArr = [':minimum_grade'=>$minimum_grade, ':program_id'=>$program_id, ':class_id'=>$class_id];
				$query_result_rows = add_db_rows($query_string,$dataArr);
				$changes += $query_result_rows;
			}
		}
		
		foreach ($sequence_numbers as $class_id => $seqno)
		{
			$query_string = "
			UPDATE program_classes
			SET
				sequence_no=:seqno
			WHERE
				program_id=:program_id
				AND
				class_id=:class_id
			;";
            $dataArr = [':seqno'=>$seqno, ':program_id'=>$program_id, ':class_id'=>$class_id];
			$query_result_rows = add_db_rows($query_string, $dataArr);
			$changes += $query_result_rows;
		}
		
		if ($changes > 0)
		{
            $journ = new Journals();
			$note = "Updated <program:$program_id> classes.";
			$journ->record_update_program($user_id, $program_id, $note);
		}
	}