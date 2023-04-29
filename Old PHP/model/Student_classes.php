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

    public function students_for_user($user_id)
    {
      try {
          $query = "SELECT
                      students.id,
                      CONCAT(COALESCE(last,'*'), ', ', COALESCE(first,'*'), ' (', cwu_id, ')') AS name
                    FROM
                      students
                      JOIN
                      student_programs
                      ON students.id=student_programs.student_id
                    WHERE
                      cwu_id != 0
                      AND
                      student_programs.user_id=?
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