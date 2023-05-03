<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Prerequisites {
    private $db;
    private $table = 'prerequisites';


    public function updatePrerequisites($class_id, $prereq_ids, $required_grades) {
        try {
            // Delete existing prerequisites for the given class
            $query = "DELETE FROM " . $this->table . " WHERE class_id = ?";
            $this->db->add_db($query, [$class_id]);

            // Insert new prerequisites for the given class
            foreach ($prereq_ids as $prereq_id) {
                $query = "INSERT INTO " . $this->table . " (class_id, prerequisite_id) VALUES (?, ?)";
                $this->db->add_db($query, [$class_id, $prereq_id]);
            }

            // Insert new prerequisites with minimum grade for the given class
            foreach ($required_grades as $prereq_id => $minimum_grade) {
                if ($minimum_grade > 0) {
                    $query = "INSERT INTO " . $this->table . " (class_id, prerequisite_id, minimum_grade) VALUES (?, ?, ?)";
                    $this->db->add_db($query, [$class_id, $prereq_id, $minimum_grade]);
                }
            }
            return true; // Return true if update is successful
        } catch(PDOException $e) {
            return false; // Return false if there is an error
        }
    }

    public function getPrerequisites($class_id) {
        try {
            // Select prerequisites and their minimum grades for the given class
            $query = "SELECT " . $this->table . ".prerequisite_id, classes.name, " . $this->table . ".minimum_grade FROM " . $this->table . " JOIN classes ON " . $this->table . ".prerequisite_id = Classes.id WHERE " . $this->table . ".class_id = ?";
            $prereqs = $this->db->get_from_db($query, [$class_id]);

            // Return an array of prerequisites and their minimum grades
            return $prereqs;
        } catch(PDOException $e) {
            return false; // Return false if there is an error
        }
    }
}


