<?php
include_once 'PDO-methods.php';

class Electives 
{
    private $db;
    private $table = 'electives';


    public function get_electives_credits($student_id, $program_id)
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
            student_classes.student_id = ?
            AND
            electives.program_id = ?
        ;";
        $query_result = $this->db->get_from_db($query_string, [$student_id, $program_id]);

        $credits = 0;
        $electives = array();
        foreach ($query_result as $row)
        {
            $electives[$row['id']] = $row;
            $credits += $row['credits'];
        }

        return array('electives' => $electives, 'credits' => $credits);
    }

    public function add_student_elective($student_class_id, $program_id)
    {
        $query =
        "
            INSERT INTO electives
                (student_class_id, program_id)
            VALUES
                (:student_class_id, :program_id)
        "

        $dataArr = [':student_class_id'=>$student_class_id, ':user_id'=>$user_id];
        return add_db($query, $dataArr);
    }
}
