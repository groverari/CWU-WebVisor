<?php
    include_once 'PDO-methods.php';
    include_once 'Journals.php';

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
                majors
            ORDER BY
                name
            ;";
            return get_from_db( $query);
        }

        public function create($name, $active)
        {
            $query = "
			INSERT INTO
				majors(name, active)
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
				majors
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
                majors
            WHERE id=:id
            ;";

            $dataArr = [':id'=>$id];
            $result = get_from_db( $query, $dataArr);

            return $result;
        }
    }