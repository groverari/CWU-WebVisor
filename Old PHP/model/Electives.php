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
            Classes.id AS class_id,
            Classes.name AS short_name,
            CONCAT(Classes.name, ' (', Classes.credits, ' cr)') AS name,
            Classes.title,
            Classes.credits,
            Classes.fall,
            Classes.winter,
            Classes.spring,
            Classes.summer,
            Student_Classes.term,
            Student_Classes.id,
            Electives.id AS elective_id
        FROM
            Electives
            JOIN Student_Classes ON Electives.student_class_id=Student_Classes.id
            JOIN Classes ON Student_Classes.class_id = Classes.id
        WHERE
            Student_Classes.student_id = ?
            AND
            Electives.program_id = ?
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
            INSERT INTO Electives
                (student_class_id, program_id)
            VALUES
                (:student_class_id, :program_id)
        "

        $dataArr = [':student_class_id'=>$student_class_id, ':user_id'=>$user_id];
        return add_db($query, $dataArr);
    }
}
