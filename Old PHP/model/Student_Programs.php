<?php
    include_once 'PDO-methods.php';

    class Student_Programs
    {
        function student_in_program($student_id, $program_id)
        {
            $query = "
            SELECT
                *
            FROM
                student_programs
            WHERE
                student_id=:student_id
                AND
                program_id=:program_id
            ;";
            $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
            return get_from_db($query, $dataArr);
        }

        function get_student_program_advisor($student_id, $program_id)
        {
            $query ="
                SELECT
                Users.id,
                Users.name,
                Users.login
            FROM
                Student_Programs
                JOIN Users ON Student_Programs.user_id=Users.id
            WHERE
                student_id=$student_id
                AND
                Student_Programs.program_id=$program_id
            ;";

            $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];

            return get_from_db($query, $dataArr);
        }

        function update_student_advisor($user_id, $student_id, $program_id, $advisor_id)
        {
            $query = "
            UPDATE
                Student_Programs
            SET
                user_id=:advisor_id
            WHERE
                student_id=:student_id
                AND
                program_id=:program_id
            ;"; 

            $dataArr = [':advisor_id'=>$advisor_id, ':student_id'=>$student_id, ':program_id'=>$program_id];
            $rowsAffected = add_db_rows($query, $dataArr);
            if($rowsAffected > 0)
            {
                $journ = new Journal();
                $note = "Set advisor to <user:$advisor_id> for <student:$student_id> in <program:$program_id>.";
                $journ->record_update_student($user_id, $student_id, $note);
            }
        }
    }