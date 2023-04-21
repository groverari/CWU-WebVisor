<?php
    class Majors
    {
        private $conn;
        private $table ='Majors';

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

        public function create($name, $active)
        {
            $query = "
			INSERT INTO
				Majors(name, active)
			VALUES
				('$name', '$active')
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

        public function update($id, $name, $active)
        {
            $query = "
			UPDATE
				Majors
			SET
				name='$name',
				active='$active'
			WHERE
				id=$id
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

        public function readSingle($id)
        {
            $query= "
            SELECT
                name, active
            FROM
                Majors
            WHERE id=$id
            ;";

            $stmt = $this->conn->prepare($query);
  
            //prepare stmt
            $stmt = $this->conn->prepare($query);

            //execute query
            $stmt->execute();

            return $stmt;
        }
    }