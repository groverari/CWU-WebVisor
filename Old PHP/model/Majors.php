<?php
    include_once 'PDO-methods.php';
    include_once 'Journals.php';

        	//InProcess-Josh
        function add_major($user_id, $name, $active)
        {		
             $query_string = "
                INSERT INTO
                    majors(name, active)
                VALUES
                    (:name, :active)
                ;";
            $data_array = [':name' => $name, ':active' => $active];    
            $query_result = add_db_id( $query_string, $data_array);
            
            
            
            if ($query_result > 0)
            {
                $note = "<major:$query_result> added.";
                $journ = new Journals();
                $journ->record_update_major($user_id, $query_result, $note);
            }
            
            return $query_result;
        }
         function all_majors()
        {
            $query = "
            SELECT
			    id, name, active
            FROM
                majors
            ORDER BY
                name
		    ;";
            $result = get_from_db( $query);

            $all_majors = array();
            foreach($result as $row)
            {
                $all_majors[$row['id']] = $row['name'];
            }
            return $all_majors;
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

            //InProcess-Josh
        function update_major($user_id, $major_id, $name, $active)
        {		
            $query_string = "
                UPDATE
                    majors
                SET
                    name=:name,
                    active=:active
                WHERE
                    id=:major_id
                ;";
        
            $data_array = [':name' => $name, ':active' => $active, ':major_id' => $major_id];     
            $query_result = add_db_rows($query_string, $data_array);

            if ($query_result> 0)
            {
                $journ = new Journals();
                $note = "<major:$major_id> updated.";
                $journ->record_update_major($user_id, $major_id, $note);
            }
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

         function get_major_info($id)
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
    