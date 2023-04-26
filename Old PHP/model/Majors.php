<?php
    include_once 'PDO-methods.php';

    class Majors
    {
        private $conn;
        private $table ='Majors';

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
            return get_from_db( $query);
        }

        public function create($name, $active)
        {
            $query = "
			INSERT INTO
				Majors(name, active)
			VALUES
				(:name, :active)
			;";
            
            $dataArr = [':name'=>$name, ':active'=>$active];
            return add_db( $query, $dataArr);
        }

        public function update($id, $name, $active)
        {
            $query = "
			UPDATE
				Majors
			SET
				name=:name,
				active=:active
			WHERE
				id=:id
			;";

            $dataArr = [':name'=>$name, ':active'=>$active, ':id'=>$id];
            return add_db( $query, $dataArr);
    
            return false;
        }

        public function readSingle($id)
        {
            $query= "
            SELECT
                name, active
            FROM
                Majors
            WHERE id=:id
            ;";

            $dataArr = [':id'=>$id];
            $result = get_from_db( $query, $dataArr);

            return $result;
        }
    }