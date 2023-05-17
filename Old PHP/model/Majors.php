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
            $queryCheck = "
            SELECT
                *
            FROM
                majors
            WHERE
                name=:name;";
            $dataArr = [':name'=>$name];
            if(get_from_db_rows($queryCheck, $dataArr) > 0)
            {
                return "Error: Major name already exists";
            }
            
            $query = "
			INSERT INTO
				majors(name, active)
			VALUES
				(:name, :active)
			;";
            
            $dataArr = [':name'=>$name, ':active'=>$active];
            return add_db_rows( $query, $dataArr);
        }

         function update($id, $name, $active, $user_id)
        {
            $queryCheck = "
            SELECT
                *
            FROM
                majors
            WHERE
                name=:name;";
            $dataArr = [':name'=>$name];
            if(get_from_db_rows($queryCheck, $dataArr) > 0)
            {
                return "Error: Major name already exists";
            }


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
            
            if(add_db( $query, $dataArr)){
                $journ = new Journals();
                $note = "Updated Major: ".$id." by user: ".$user_id;
                $journ->record_update_major($user_id, $id, $note);
                return true;
            }
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
    