<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Student_classes 
{
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
			JOIN Classes ON student_classes.class_id=classes.id
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
    
    public function add_student_elective($student_class_id, $program_id)
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

    public function students_for_user($user_id)
    {
      try {
          $query = "SELECT
                      students.id,
                      CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
                    FROM
                      students
                      JOIN
                      student_programs
                      ON students.id=student_programs.student_id
                    WHERE
                      cwu_id != 0
                      AND
                      student_programs.user_id=?
                    ORDER BY
                      active, last, first ASC";

          $this->db->beginTransaction();

          $this->db->add_db($query, [$user_id]);
          $query_result = $this->db->fetchAll(PDO::FETCH_ASSOC);

          $all_students = array();
          foreach ($query_result as $row)
          {
              $id = $row['id'];
              $name = $row['name'];
              $all_students[$id] = $name;
          }

          $this->db->commit();

          return $all_students;
      } catch (PDOException $e) {
          $this->db->rollBack();
          throw $e;
      }
    }
}