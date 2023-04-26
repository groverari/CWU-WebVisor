<?php
    class Student_Classes
    {
        function get_plan($tudent_id, $start_year, $end_year)
        {

        }

        function add_student_class($student_id, $class_id, $term)
	    {
			$query = "
			INSERT INTO
				Student_Classes(student_id, class_id, term)
			VALUES
				(:student_id, :class_id, :term)
			;";

            $dataArr = [':student_id'=>$student_id, ':class_id'=>$class_id, ':term'=>$term];
            
            //might need to be changed--look at corresponding sql file
            $note = "<class:$class_id> added to <student:$student_id> in <term:$term>.";
            record_update_student($user_id, $student_id, $note);
        }

        function clear_plan($student_id)
        {
            $string = "
            DELETE FROM
                Student_Classes
            WHERE
                student_id='$student_id'
                AND term != '000'
                ;";
            
            $dataArr = [':student_id'=>$student_id];
            return remove_db($query, $dataArr);
        }
    }