<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

    function get_electives_credits($student_id, $program_id)
    {
        $query_string = "
        SELECT
            classes.id AS class_id,
            classes.name AS short_name,
            CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name,
            classes.title,
            classes.credits,
            classes.fall,
            classes.winter,
            classes.spring,
            classes.summer,
            student_classes.term,
            student_classes.id,
            electives.id AS elective_id
        FROM
            electives
            JOIN student_classes ON electives.student_class_id=student_classes.id
            JOIN classes ON student_classes.class_id = classes.id
        WHERE
            student_classes.student_id = :student_id
            AND
            electives.program_id = :program_id
        ;";
        $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
        $query_result = get_from_db($query_string, $dataArr);

        $credits = 0;
        $electives = array();
        foreach ($query_result as $row)
        {
            $electives[$row['id']] = $row;
            $credits += $row['credits'];
        }

        return array('electives' => $electives, 'credits' => $credits);
    }
