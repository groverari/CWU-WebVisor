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

    public function students_for_user($user_id)
    {
      try {
          $query = "SELECT
                      Students.id,
                      CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
                    FROM
                      Students
                      JOIN
                      Student_Programs
                      ON Students.id=Student_Programs.student_id
                    WHERE
                      cwu_id != 0
                      AND
                      Student_Programs.user_id=?
                    ORDER BY
                      active, last, first ASC";

          $this->db->beginTransaction();

          $this->db->add_db($query, [$user_id]);
          $query_result = $this->db->fetchAll(PDO::FETCH_ASSOC);

          $all_students = array();
          foreach ($query_result as $row)
          {
              $id = $row['id'];
              $name = $row['name'];
              $all_students[$id] = $name;
          }

          $this->db->commit();

          return $all_students;
      } catch (PDOException $e) {
          $this->db->rollBack();
          throw $e;
      }
    }
}