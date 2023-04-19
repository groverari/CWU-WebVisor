<?php
    class Majors
    {
        private $conn;
        private $table ='majors';

        //major properties
        public $name;
        public $active;

        //constructor
        public function __construct($db)
        {
            $this->conn = $db;
        }

        public function read()
        {
            $query = "
            SELECT
                id, name, active
            FROM
                Majors
            ORDER BY
                name
            ;";
		     //prepare stmt
             $stmt = $this->conn->prepare($query);

             //execute query
             $stmt->execute();
 
             return $stmt;
        }

        public function create()
        {
            $query = "
			INSERT INTO
				Majors(name, active)
			VALUES
				('$this->name', '$this->active')
			;";

            $stmt = $this->conn->prepare($query);
  
            // Execute query
            if($stmt->execute()) {
              return true;
            }
  
            // Print error if something goes wrong
            printf("Error: %s.\n", $stmt->error);
    
            return false;
        }
    }