<?php
include_once 'PDO-methods.php';

class Student_classes 
{

    private $db;
    private $table = 'student_classes';

    public function __construct($db) 
    {
        $this->db = $db;
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
		$query_result_rows = remove_db_rows($query, $dataArr);
		
		if ($query_result_rows > 0)
		{
            $journ = new Journal()
			$note = "<student:$student_id> plan cleared.";
			$journ->record_update_student($user_id, $student_id, $note);
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
            $journ = new Journal();
            $note = "<class:$class_id> added to <student:$student_id> in <term:$term>.";
            $journ->record_update_student($user_id, $student_id, $note);
        }
    }


//student_classes file
public function get_lost_students()
{
    $NO = 'No';
    $YES = 'Yes';

    $query_string = "
    SELECT
        student_classes.term,
        CONCAT(classes.name, ' (', classes.credits, ' cr)') AS class_name,
        CONCAT(Students.first, ' ', students.last) AS student_name,
        students.cwu_id,
        classes.id AS class_id
    FROM
        student_classes
        JOIN classes ON student_classes.class_id=Classes.id
        JOIN students ON student_classes.student_id=students.id
    WHERE
        (
            (
                RIGHT(term,1) = '1'
                AND classes.fall = ?
            )
            OR
            (
                RIGHT(term,1) = '2'
                AND classes.winter = ?
            )
            OR
            (
                RIGHT(term,1) = '3'
                AND classes.spring=?
            )
            OR
            (
                RIGHT(term,1) = '4'
                AND classes.summer = ?
            )
        )   
        AND
            LEFT(term,4) >= YEAR(CURDATE())    
        AND
            students.active = ?
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

}