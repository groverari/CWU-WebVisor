<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';



    function updatePrerequisites($class_id, $prereq_ids, $required_grades) {
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

    function get_prereqs($class_id)
	{
		$query_string = "
		SELECT
			prerequisites.prerequisite_id,
			classes.name,
			prerequisites.minimum_grade
		FROM
			prerequisites
			JOIN classes ON prerequisites.prerequisite_id=classes.id
		WHERE
			prerequisites.class_id = :class_id
		;";
        $dataArr = [':class_id'=>$class_id];
		$query_result = get_from_db($query_string, $dataArr);
		
		$prereqs = array();
		foreach($query_result as $row)
		{
			$prereqs[$row['prerequisite_id']] = $row;
		}
		
		return $prereqs;
	}


