<?php
include_once 'PDO-methods.php';

class Student 
{
    private $db;
    private $table = 'students';

    public function __construct($db) 
    {
        $this->db = $db;
    }
    public function all_students($active_only = false)
    {
        $query_string = "
            SELECT
                id,
                CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
            FROM
                students
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
    
        $query_result = $this->db->get_from_db($query_string);
    
        $all_students = array();
        foreach ($query_result as $row)
        {
            $id = $row['id'];
            $name = $row['name'];
            $all_students[$id] = $name;
        }
    
        return $all_students;
    }
    

    public function get_lost_students()
    {
        $NO = 'No';
        $YES = 'Yes';
    
        $query_string = "
        SELECT
            Student_Classes.term,
            CONCAT(Classes.name, ' (', Classes.credits, ' cr)') AS class_name,
            CONCAT(Students.first, ' ', Students.last) AS student_name,
            Students.cwu_id,
            Classes.id AS class_id
        FROM
            Student_Classes
            JOIN Classes ON Student_Classes.class_id=Classes.id
            JOIN Students ON Student_Classes.student_id=Students.id
        WHERE
            (
                (
                    RIGHT(term,1) = '1'
                    AND Classes.fall = ?
                )
                OR
                (
                    RIGHT(term,1) = '2'
                    AND Classes.winter = ?
                )
                OR
                (
                    RIGHT(term,1) = '3'
                    AND Classes.spring=?
                )
                OR
                (
                    RIGHT(term,1) = '4'
                    AND Classes.summer = ?
                )
            )   
            AND
                LEFT(term,4) >= YEAR(CURDATE())    
            AND
                Students.active = ?
            ORDER BY
                term
        ;";
    
        $query_result = $this->db->get_from_db($query_string, [$NO, $NO, $NO, $NO, $YES]);
    
        $info = array();
        foreach ($query_result as $row)
        {
            $info[] = $row;
        }
    
        return $info;
    }
    

    public function get_bad_cwu_ids()
{
    $query_string = "
        SELECT
            cwu_id,
            CONCAT(first, ' ', last) AS name,
            email,
            active
        FROM
            Students
        WHERE
            cwu_id != 0
            AND
            (
                cwu_id < 10000000
                OR
                cwu_id > 99999999
            )
    ";
    $query_result = $this->db->get_from_db($query_string);

    $bad_cwu_ids = array();
    foreach ($query_result as $row)
    {
        $bad_cwu_ids[] = $row;
    }

    return $bad_cwu_ids;
}


public function get_enrollments($year) {
    $year1 = 10*$year+1;
    $year2 = 10*($year)+2;
    $year3 = 10*($year)+3;
    $year4 = 10*($year)+4;

    $query_string = "
        SELECT
            Classes.id,
            Classes.name,
            Student_Classes.term,
            CONCAT(Classes.name, ' (', Classes.credits, ' cr)') AS name_credits,
            COUNT(Student_Classes.student_id) AS enrollment
        FROM
            Classes,
            Student_Classes,
            Students
        WHERE
            Classes.id=Student_Classes.class_id
            AND
            (
                Student_Classes.term=?
                OR
                Student_Classes.term=?
                OR
                Student_Classes.term=?
                OR
                Student_Classes.term=?
            )
            AND
            Students.id=Student_Classes.student_id
            AND
            Students.active=?
        GROUP BY
            name_credits,
            Student_Classes.term
        ORDER BY
            Classes.name ASC,
            Student_Classes.term
    ";
    $query_result = $this->db->get_from_db($query_string, [$year1, $year2, $year3, $year4, 'yes']);

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


}
