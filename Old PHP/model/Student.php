<?php
include_once 'PDO-methods.php';

class Students
{

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
            $rowAffected = add_db_row($query, $dataArr);
            if($rowAffected > 0)
            {
                $journ = new Journal();
                $note = "Updated <student:$student_id>.";
                $journ->record_update_student($user_id, $student_id, $note);
            }
        }

        function add_student($user_id, $cwu_id, $email, $first='', $last='')
	    {
        
            $query_string = "
            INSERT INTO students
                (cwu_id, email, first, last)
            VALUES
                (:cwu_id, :email, :first, :last)
            ;";
            
            $dataArr = [':cwu_id'=>$cwu_id, ':email'=$email, ':first'=>$first, ':last'=>$last];

            record_update_student($user_id, $student_id, "Added <student:$student_id>");

            return $student_id;
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