<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';


	function get_class_conflicts($class1_id, $class2_id, $term, $activeStudent)
	{		
		$query = "
		SELECT DISTINCT
			students.id,
			students.cwu_id,
			students.first,
			students.last
		FROM
			students,
			student_classes AS First,
			student_classes AS Second
		WHERE
			First.student_id=Second.student_id
			AND
			First.class_id=:class1_id
			AND
			Second.class_id=:class2_id
			AND
			First.term=:term
			AND
			Second.term=:term
			AND
			students.active=:activeStudent
			AND
			students.id=First.student_id
		ORDER BY last, first ASC;";
		
		$dataArr = [':class1_id'=>$class1_id, ':class2_id'=>$class2_id, ':term'=>$term, ':activeStudent'=>$activeStudent];
		$result = get_from_db($query, $dataArr);
		foreach ($result as $row)
		{
			$result[$row['id']] = $row;
		}
		
		return $result;
	}

	function get_class_intersections($class_id, $term, $activeStudent)
	{		
		$query = "
		SELECT DISTINCT
			classes.id,
			classes.name,
			Count(*) AS count
		FROM
			student_classes AS Hub,
			student_classes AS Spoke,
			classes,
			students
		WHERE
			Hub.class_id=:class_id
			AND
			Hub.term=:term
			AND
			Hub.student_id=Spoke.student_id
			AND
			Spoke.term=Hub.term
			AND
			classes.id=Spoke.class_id
			AND
			students.id=Hub.student_id
			AND
			students.active=:activeStudent
			AND
			Hub.class_id != Spoke.class_id
		GROUP BY
			classes.name;";
		$dataArr = [':class_id'=>$class_id, ':term'=>$term, ':activeStudent'=>$activeStudent];
		$result = get_from_db($query, $dataArr);
		
		return $result;
		
	}

	function get_class_roster($class_id, $term)
	{		
		$query_string = "
		SELECT
			CONCAT(students.last, ', ', students.first) AS name,
			students.email,
			students.cwu_id
		FROM
			student_classes
			JOIN students ON student_classes.student_id=students.id
		WHERE
			class_id=:class_id
			AND
			term=:term
			AND students.active = 'Yes'
		ORDER BY
			students.last, students.first ASC
			;";
		$dataArr = [':class_id'=>$class_id, [':term']=>$term];
		$query_result = get_from_db($query_string, $dataArr);
		$roster = array();
		foreach($query_result as $row)
		{
			$roster[] = $row;
		}
		return $roster;
	}

	function get_class_rosters($class_id)
	{
		$rosters = array();
		
		$query_string = "
		SELECT
			term,
			student_id
		FROM
			student_classes
			JOIN students ON students.id=student_classes.student_id
		WHERE
			class_id=:class_id
			AND
			students.active = 'Yes'
		ORDER BY
			term
			;";
		$dataArr = [':class_id'=>$class_id];
		$result = get_from_db($query_string, $dataArr);
		$term_id = array();
		foreach($result as $row)
		{
			$term_id = $row['term'];
			$catalog_year = substr($term_id, 0, 4);
			$catalog_term = substr($term_id, 4, 1);
			if (!isset($rosters[$catalog_year]))
			{
				$rosters[$catalog_year] = array();
			}
			if (!is_array($rosters[$catalog_year][$catalog_term]))
			{
				$rosters[$catalog_year][$catalog_term] = array();
			}
			$rosters[$catalog_year][$catalog_term][] = $row['student_id'];
		}
		
		return $rosters;
	}

    function get_plan($student_id, $start_year, $end_year)
	{
		
		if ($start_year != 0 && $end_year != 0)
		for($year = $start_year; $year < $end_year; ++$year)
		{
			$classes_by_term[$year] = array(array(), array(), array(), array(), array());
		}
		$classes_by_id = array();
	
		$query_string = "
		SELECT
			student_classes.id AS student_class_id,
			student_classes.term,
			classes.id
		FROM
			student_classes
			JOIN classes ON student_classes.class_id=classes.id
		WHERE
			student_classes.student_id=:student_id
		ORDER BY
			student_classes.term,
			classes.name
			;";
		
        $dataArr = [':student_id'=>$student_id];
		$query_result = get_from_db($query_string, $dataArr);

		foreach ($query_result as $row)
		{
			$term = $row['term'];
			$class_id = $row['id'];
			$student_class_id = $row['student_class_id'];
			
			$catalog_year = substr($term, 0,4);
			$catalog_term = substr($term, 4,1);
			
			if (!isset($classes_by_term[$catalog_year]))
			{
				$classes_by_term[$catalog_year] = array(array(), array(), array(), array(), array());
			}
			
			if ($term != 000)
			{
				$classes_by_term[$catalog_year][$catalog_term][] = array('student_class_id' => $student_class_id, 'class_id' => $class_id);
			}
			$classes_by_id[$class_id] = $term;
		}
		
		ksort($classes_by_term);
		
		$prev_year = 0;	
		foreach ($classes_by_term as $year => $classes)
		{
			if ($prev_year != 0 && $prev_year != 0)
			{
				while($prev_year < $year - 1)
				{
					$prev_year++;
					$classes_by_term[$prev_year] = array(array(), array(), array(), array(), array());
				}
			}
			$prev_year = $year;
		}
		
		ksort($classes_by_term);
				
		return array('by term' => $classes_by_term, 'by id' => $classes_by_id);
	}

    function update_plan($user_id, $student_id, $program_id, $classes)
	{
        $journ = new Journals();
		$note = "Begin Update: <student:$student_id> plan.";
		$journ->record_update_student($user_id, $student_id, $note);
		
		clear_plan($user_id, $student_id);
		
		foreach($classes as $class_id => $data)
		{
			foreach ($data as $datum)
			{
				$term = $datum[0];
				$slot = $datum[1];
				$elective = $datum[2];
				
				$student_class_id = add_student_class($user_id, $student_id, $class_id, $term);

				if ($elective)
				{
					add_student_elective($user_id, $student_class_id, $program_id);
				}
			}
		}
		
		$note = "End Update: <student:$student_id> plan.";
		$journ->record_update_student($user_id, $student_id, $note);
	}
    
    function add_student_elective($student_class_id, $program_id)
    {
        $query =
        "
            INSERT INTO electives
                (student_class_id, program_id)
            VALUES
                (:student_class_id, :program_id)
        ";

        $dataArr = [':student_class_id'=>$student_class_id, ':program_id'=>$program_id];
        return add_db($query, $dataArr);
    }

    function clear_plan($user_id, $student_id)
    {
        $query_string = "
		DELETE FROM
			student_classes
		WHERE
			student_id=:student_id
			AND term != '000'
			;";
        $dataArr = [':student_id'=>$student_id];
		$query_result_rows = remove_db_rows($query_string, $dataArr);
		
		if ($query_result_rows > 0)
		{
            $journ = new Journals();
			$note = "<student:$student_id> plan cleared.";
			$journ->record_update_student($user_id, $student_id, $note);
		}
    }

    function update_requirements($student_id, $requirements_taken)
	{
		$query_string = "
		DELETE FROM
			student_classes
		WHERE
			student_id = 'student_id'
			AND
			term = 000
		;";
        $dataArr = [':$student_id' => $student_id];
		$query_result = remove_db($dataArr, $query_string);
		
		foreach ($requirements_taken as $requirement_id)
		{
			$query_string = "
			INSERT INTO Student_Classes
				(student_id, class_id, term)
			VALUES
				($student_id, $requirement_id, 000)
			;";
            $dataArr = [':student_id'=>$student_id, ':requirement_id'=>$requirement_id];
			$query_result = add_db($query_string, $dataArr);
		}
	}

    function add_student_class($user_id, $student_id, $class_id, $term)
    {
        $query = "
        INSERT INTO
            student_classes(student_id, class_id, term)
        VALUES
            (:student_id, :class_id, :term)
        ;";

        $dataArr = [':student_id'=>$student_id, ':class_id'=>$class_id, ':term'=>$term];
        $result = add_db($query, $dataArr);
        if($result['id'])
        {
            $journ = new Journals();
            $note = "<class:$class_id> added to <student:$student_id> in <term:$term>.";
            $journ->record_update_student($user_id, $student_id, $note);
        }
    }

	//student_classes file
	function get_lost_students()
	{
		$query_string = "
		SELECT
			student_classes.term,
			CONCAT(classes.name, ' (', classes.credits, ' cr)') AS class_name,
			CONCAT(students.first, ' ', students.last) AS student_name,
			students.cwu_id,
			classes.id AS class_id
		FROM
			student_classes
			JOIN classes ON student_classes.class_id=classes.id
			JOIN students ON student_classes.student_id=students.id
		WHERE
			(
				(
					RIGHT(term,1) = '1'
					AND classes.fall = 'YES'
				)
				OR
				(
					RIGHT(term,1) = '2'
					AND classes.winter = 'NO'
				)
				OR
				(
					RIGHT(term,1) = '3'
					AND classes.spring= 'NO'
				)
				OR
				(
					RIGHT(term,1) = '4'
					AND classes.summer = 'NO'
				)
			)   
			AND
				LEFT(term,4) >= YEAR(CURDATE())    
			AND
				students.active = 'YES'
			ORDER BY
				term
		;";

		$query_result = get_from_db($query_string);

		$info = array();
		foreach ($query_result as $row)
		{
			$info[] = $row;
		}

		return $info;
	}