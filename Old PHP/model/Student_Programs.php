<?php
    include_once 'PDO-methods.php';

    class Student_Programs
    {
        function student_in_program($student_id, $program_id)
        {
            $query_string = "
            SELECT
                *
            FROM
                Student_Programs
            WHERE
                student_id=:student_id
                AND
                program-id=:program_id
            ;";
            $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
            return get_from_db($query, $dataArr);
        }
    }