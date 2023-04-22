<?php
class Replacement_Classes {

    private $conn;
    private $table ='prerequisites';

    public $id;
    public $class_id;
    public $prerequisite_id;
    public $minimum_grade;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function update_prereqs($class_id, $prereq_ids, $required_grades) {
        try {
            // Delete existing prerequisites for the given class
            $stmt = $this->conn->prepare("DELETE FROM Prerequisites WHERE class_id = :class_id");
            $stmt->bindParam(":class_id", $class_id);
            $stmt->execute();

            // Insert new prerequisites for the given class
            foreach($prereq_ids as $prereq_id) {
                $stmt = $this->conn->prepare("INSERT INTO Prerequisites (class_id, prerequisite_id) VALUES (:class_id, :prereq_id)");
                $stmt->bindParam(":class_id", $class_id);
                $stmt->bindParam(":prereq_id", $prereq_id);
                $stmt->execute();
            }

            // Insert new prerequisites with minimum grade for the given class
            foreach ($required_grades as $prereq_id => $minimum_grade) {
                if ($minimum_grade > 0) {
                    $stmt = $this->conn->prepare("INSERT INTO Prerequisites (class_id, prerequisite_id, minimum_grade) VALUES (:class_id, :prereq_id, :minimum_grade)");
                    $stmt->bindParam(":class_id", $class_id);
                    $stmt->bindParam(":prereq_id", $prereq_id);
                    $stmt->bindParam(":minimum_grade", $minimum_grade);
                    $stmt->execute();
                }
            }
            return true; // Return true if update is successful
        } catch(PDOException $e) {
            return false; // Return false if there is an error
        }
    }

    public function get_prereqs($class_id) {
        try {
            // Select prerequisites and their minimum grades for the given class
            $stmt = $this->conn->prepare("SELECT Prerequisites.prerequisite_id, Classes.name, Prerequisites.minimum_grade FROM Prerequisites JOIN Classes ON Prerequisites.prerequisite_id=Classes.id WHERE Prerequisites.class_id = :class_id");
            $stmt->bindParam(":class_id", $class_id);
            $stmt->execute();
            
            // Return an array of prerequisites and their minimum grades
            $prereqs = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $prereqs[$row['prerequisite_id']] = $row;
            }
            return $prereqs;
        } catch(PDOException $e) {
            return false; // Return false if there is an error
        }
    }
}

