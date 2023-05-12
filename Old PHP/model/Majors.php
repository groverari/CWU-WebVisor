<?php
    include_once 'PDO-methods.php';
    include_once 'Journals.php';

    
         function all_majors()
        {
            $query = "
            SELECT
                *
            FROM
                majors
            ;";
            return get_from_db( $query);
        }

         function create($name, $active)
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

         function update($id, $name, $active)
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
    
            //return false;
        }

         function readSingle($id)
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
    