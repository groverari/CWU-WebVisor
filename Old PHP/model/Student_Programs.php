<?php
    include_once 'PDO-methods.php';
    include_once 'Journals.php';

    
        function programs_with_student($student_id)
        {
            $query_string = "
            SELECT
                programs.id AS program_id,
                CONCAT(majors.name, ' (', programs.year, ')') AS program_name,
                users.id AS advisor_id,
                users.name AS advisor_name
            FROM
                student_programs
                JOIN programs ON student_programs.program_id=programs.id
                JOIN majors ON majors.id = programs.major_id
                LEFT JOIN users ON student_programs.user_id=Users.id
            WHERE
                student_id=:student_id
            ORDER BY
                majors.name,
                programs.year
            ;";
            $dataArr = [':student_id'=>$student_id];
            $query_result = get_from_db($query_string, $dataArr);
            
            $programs = array();
            foreach($query_result as $row)
            {
                $programs[$row['program_id']] = $row;
            }
            
            return $programs;
        }

        function user_can_update_student($user_id, $student_id)
        {
            $query_string = "
            SELECT
                id
            FROM
                student_programs
            WHERE
                user_id=:user_id
                AND
                student_id=:student_id
            ;";
            $dataArr =[':user_id'=>$user_id, ':student_id'=>$student_id];
    
            $query_result_rows = get_from_db_rows($query_string, $dataArr);
            
            return ($query_result_rows > 0);	
        }

        function student_in_program($student_id, $program_id)
        {
            $query = "
            SELECT
                *
            FROM
                student_programs
            WHERE
                student_id=:student_id
                AND
                program_id=:program_id
            ;";
            $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
            return get_from_db($query, $dataArr);
        }

        function update_student_programs($user_id, $student_id, $remove_programs, $add_program_id, $add_advisor_id, $non_stem_majors)
        {
            //! @todo start update
            
            foreach ($remove_programs as $program_id)
            {
                $query_string = "
                DELETE FROM
                    student_programs
                WHERE
                    student_id = :student_id
                    AND
                    program_id = :program_id
                ;";
                
                $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
                $query_result = remove_db_rows($query_string, $dataArr);
                
                if ($query_result > 0)
                {
                    //! @todo record removal
                }
            }
            
            if ($add_program_id != 0)
            {
                $query_string = "
                INSERT INTO
                    student_programs(student_id, program_id, user_id)
                VALUES
                    (:student_id, :add_program_id, :add_advisor_id)
                ;";
                
                $dataArr = [':student_id'=>$student_id, ':add_program_id'=>$add_program_id, ':add_advisor_id'=>$add_advisor_id];

                $query_result_rows = add_db_rows($query_string, $dataArr);
                
                if ($query_result_rows > 0)
                {
                    //! @todo record addition
                }
            }
            
            $query_string = "
            UPDATE
                students
            SET
                non_stem_majors=:non_stem_majors
            WHERE
                id=:student_id
            ;";
            
            $dataArr = [':non_stem_majors'=>$non_stem_majors, ':student_id'=>$student_id];
            $query_result_row = add_db_rows($query_string, $dataArr);
            
            if ($query_result_row > 0)
            {
                //record update
            }
        }

        function get_student_program_advisor($student_id, $program_id)
        {
            $query ="
                SELECT
                users.id,
                users.name,
                users.login
            FROM
                student_programs
                JOIN users ON student_programs.user_id=users.id
            WHERE
                student_id=:student_id
                AND
                student_programs.program_id=:program_id
            ;";

            $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];

            return get_from_db($query, $dataArr);
        }

        function update_student_advisor($user_id, $student_id, $program_id, $advisor_id)
        {
            $query = "
            UPDATE
                student_programs
            SET
                user_id=:advisor_id
            WHERE
                student_id=:student_id
                AND
                program_id=:program_id
            ;"; 

            $dataArr = [':advisor_id'=>$advisor_id, ':student_id'=>$student_id, ':program_id'=>$program_id];
            $rowsAffected = add_db_rows($query, $dataArr);
            if($rowsAffected > 0)
            {
                $journ = new Journals();
                $note = "Set advisor to <user:$advisor_id> for <student:$student_id> in <program:$program_id>.";
                $journ->record_update_student($user_id, $student_id, $note);
            }
        }

        function add_student_to_advisor($user_id, $student_id, $program_id){
            $query = "INSERT INTO student_programs (student_id, program_id, user_id
                    VALUES (:student_id, :program_id, :user_id";

            $rowsAffected = add_db_rows($query, ['$student_id'=>$student_id, ':program_id'=>$program_id, 'user_id'=>$user_id]);
            if($rowsAffected > 0)
            {
                $journ = new Journals();
                $note = "Set advisor to <user:$user_id> for <student:$student_id> in <program:$program_id>.";
                $journ->record_update_student($user_id, $student_id, $note);
                return true;
            }
            return false;
        }