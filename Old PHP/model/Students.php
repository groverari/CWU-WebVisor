<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';


    function cwu_id_to_student_id($cwu_id)
	{		
		$query_string = "
		SELECT
			COALESCE(id,0) AS id
		FROM 
			students
		WHERE
			cwu_id=:cwu_id
		;";
        $dataArr =[':cwu_id'=>$cwu_id];
		$query_result = get_from_db($query_string, $dataArr);
		
		return $query_result['id'];
	} 

    function update_student($user_id, $student_id, $first, $last, $cwu_id, $email, $phone, $address, $postbaccalaureate, $withdrawing, $veterans_benefits, $active)
    {
        $query = "
        UPDATE
            students
        SET
            first=:first,
            last=:last,
            cwu_id=:cwu_id,
            email=:email,
            phone=:phone,
            address=:address,
            postbaccalaureate=:postbaccalaureate,
            withdrawing=:withdrawing,
            veterans_benefits=:veterans_benefits,
            active=:active
        WHERE
            id=:student_id
            ;";

        $dataArr = [':first'=>$first, ':last'=>$last, ':cwu_id'=>$cwu_id, ':email'=>$email, ':phone'=>$phone, ':address'=>$address, ':postbaccalaureate'=>$postbaccalaureate, ':withdrawing'=>$withdrawing, ':veterans_benefits'=>$veterans_benefits, ':active'=>$active, ':student_id'=>$student_id];
        $rowAffected = add_db_rows($query, $dataArr);
        if($rowAffected > 0)
        {
            $journ = new Journals();
            $note = "Updated <student:$student_id>.";
            $journ->record_update_student($user_id, $student_id, $note);
            return true;
        }
        return false;
    }

    function add_student($user_id, $cwu_id, $email, $first='', $last='')
    {
        $id=0;
        $query = "";
        $data_array=[];
        if ($cwu_id != 0)
        {
            $query = "
            SELECT
                id
            FROM
                students
            WHERE
                cwu_id=:cwu_id OR email=:email
            ;";
            
            $data_array = [':cwu_id'=>$cwu_id, ':email'=>$email];
            echo "\n\n\n\n getRows\n\n\n\n";
            $query_result_rows = get_from_db_rows($query, $data_array);
            if ($query_result_rows > 0)
            {
                return "Error: CWU ID or email Already Exists";
            }
        }
        else if ($email == '')
        {
            return "Error: no email";
        }
    
        $query_string = "
        INSERT INTO students
            (cwu_id, email, first, last)
        VALUES
            (:cwu_id, :email, :first, :last)
        ;";
        $dataArr = [':cwu_id'=>$cwu_id, ':email'=>$email, ':first'=>$first, ':last'=>$last];

        echo "\n\n\nadd\n\n\n\n";
        $result = add_db($query_string, $dataArr);
        
        $query_result=get_from_db($query, $data_array);
        echo "\n\n\n\n\n";
        print_r($query_result);
        echo "\n\n\n\n\n";

        $id = $query_result[0]['id'];

        if ($result)
        {
            echo "\n\n\n in here\n\n\n\n";
            $journ = new Journals();
            $journ->record_update_student($user_id, $id, "Added <student:$id>");
        }
        else
        {
            return "Error: Cannot add student, check for duplicate id ($cwu_id) or email ($email)";
        }

        return $id;
    }

    function all_students($active_only = false)
    {
        $query_string = "
            SELECT
                id,
                CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
            FROM
                Students
            WHERE
                cwu_id != 0
            ORDER BY
                active, last, first ASC
        ";
    
        if ($active_only)
        {
            $query_string = "
                SELECT
                    id,
                    CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
                FROM
                    students
                WHERE
                    cwu_id != 0
                    AND
                    active = 'Yes'
                ORDER BY
                    last, first ASC
            ";
        }
    
        $query_result = get_from_db($query_string);
    
        $all_students = array();
        foreach ($query_result as $row)
        {
            $id = $row['id'];
            $name = $row['name'];
            $all_students[$id] = $name;
        }
    
        return $all_students;
    }
    
    function get_bad_cwu_ids()
    {
        $query_string = "
            SELECT
                cwu_id,
                CONCAT(first, ' ', last) AS name,
                email,
                active
            FROM
                students
            WHERE
                cwu_id != 0
                AND
                (
                    cwu_id < 10000000
                    OR
                    cwu_id > 99999999
                )
        ";
        $query_result = get_from_db($query_string);

        $bad_cwu_ids = array();
        foreach ($query_result as $row)
        {
            $bad_cwu_ids[] = $row;
        }

        return $bad_cwu_ids;
    }

    function get_term_enrollment($term, $class_id)
    function get_enrollments($year) 
    {
        $year1 = 10*$year+1;
        $year2 = 10*($year)+2;
        $year3 = 10*($year)+3;
        $year4 = 10*($year)+4;

        global $YES;

        $query_string = "
            SELECT
                classes.id,
                classes.name,
                student_classes.term,
                CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name_credits,
                COUNT(student_classes.student_id) AS enrollment
            FROM
                classes,
                student_classes,
                students
            WHERE
                classes.id=student_classes.class_id
                AND
                (
                    student_classes.term=$year1
                    OR
                    student_classes.term=$year2
                    OR
                    student_classes.term=$year3
                    OR
                    student_classes.term=$year4
                )
                AND
                students.id=student_classes.student_id
                AND
                students.active=$YES
            GROUP BY
                name_credits,
                student_classes.term
            ORDER BY
                classes.name ASC,
                student_classes.term
        ";
        $query_result = get_from_db($query_string, [$year1, $year2, $year3, $year4, 'yes']);

        $enrollments = array();
        foreach ($query_result as $row) {
            $class_id = $row['id'];
            $term_number = substr($row['term'], -1);
            if (!isset($enrollments[$class_id])) {
                $enrollments[$class_id] = array('name' => $row['name_credits'], 'enrollment' => array());
            }
            $enrollments[$class_id]['enrollment'][$term_number] = $row['enrollment'];
        }

        return $enrollments;
    }

    //students file
    function students_for_user($user_id)
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

          beginTransaction();

          add_db($query, [$user_id]);
          $query_result = fetchAll(PDO::FETCH_ASSOC);

          $all_students = array();
          foreach ($query_result as $row)
          {
              $id = $row['id'];
              $name = $row['name'];
              $all_students[$id] = $name;
          }

          commit();

          return $all_students;
      } catch (PDOException $e) {
          rollBack();
          throw $e;
      }
    }

    //im almost sure this function cannot be used since it includes a table which 
    //is not in the database
    function get_student_info($id, $cwu_id=0, $email='')
	{	
		$student_info = array();
		if ($id != 0)
		{
			$where = "students.id=:id";
		}
		else if ($cwu_id != 0)
		{
			$where = "students.cwu_id=:cwu_id";
		}
		else if ($email != '')
		{
			$where = "students.email=:email";
		}
		
		$query_string = "
		SELECT
			id, cwu_id, CONCAT(first, ' ', last) AS name, email, first, last, active, phone, address, postbaccalaureate, non_stem_majors, withdrawing, veterans_benefits
		FROM
			students
		WHERE
			$where
			;";
        $dataArr = [':id'=>$id, ':cwu_id'=>$cwu_id, ':email'=>$email];
		$result = get_from_db($query_string, $dataArr);
		
		$query_string = "
			SELECT
				majors.name
			FROM
				majors JOIN student_majors ON majors.id=student_majors.major_id JOIN students ON students.id=student_majors.student_id
			WHERE
				$where
			;";
        $result = get_from_db($query_string, $dataArr);
		
		return $result;
	}

    function get_all_active_students(){
        $query = "SELECT * FROM students
                    Where active = 'Yes' ";
        
        return get_from_db($query);
    }

    function get_all_inactive_students(){
        $query = "SELECT * FROM students
                    Where active = 'No' ";
        
        return get_from_db($query);
    }
    function change_activation($student_id, $active){
        $query = 'UPDATE students SET active = :active WHERE id= :student_id';
        return add_db($query, [':student_id'=> $student_id, ':active'=>$active]);
    }