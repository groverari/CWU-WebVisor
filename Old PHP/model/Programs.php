<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Programs
{
    function update_program($user_id, $program_id, $major_id, $year, $credits, $elective_credits, $active)
	{
		$query_string = "
		UPDATE
			programs
		SET
			major_id=:major_id,
			year=:year,
			credits=:credits,
			elective_credits=:elective_credits,
			active=:active
		WHERE
			id=:program_id
		;";
        $dataArr = [':major_id'=>$major_id, ':year'=>$year, ':credits'=>$credits, ':elective_credits'=>$elective_credits, ':active'=>$active, ':program_id'=>$program_id];
		$query_result = add_db_rows($query_string, $dataArr);
		
		if ($query_result > 0)
		{
            $journ = new Journals();
			$note = "Updated <program:$program_id>.";
			$journ->record_update_program($user_id, $program_id, $note);
		}
		else
        {
            return "Error: no program Id ". $program_id;
        }
		//! @todo update electives!
		
	}

    function get_program_id($major_id, $catalog_year){
        $query = "SELECT id FROM programs
                    WHERE major_id = :major_id
                        AND year = :year;";
        $data_array = [":major_id"=> $major_id, ":year"=> $catalog_year];
        $program = get_from_db($query, $data_array);
        return $program;
    }

    function get_complete_allPrograms()
    {
        $query = "
        SELECT 
            *
        FROM 
            programs;";
        $result = get_from_db($query);
        return $result;
    }

    /*TODO the original code adds user programs 
    and concats them to the to the all programs table. 
    There is also a student programs table  
    IMPORTANT!! I have left the user program code out for now. W
    I will add it if it I find out its needed.
    */
    function all_programs(){
        global $db; 
        $query = "
        SELECT 
            programs.id AS program_id,
            programs.major_id,
            programs.year,
            programs.credits,
            programs.elective_credits,
            programs.active,
            majors.id AS major_id,
            majors.name AS name
        FROM 
            programs
        JOIN 
            majors ON programs.major_id = majors.id
        ORDER BY 
            majors.name;
    ";
        $programs = get_from_db($query);
        return $programs;
    }

    function get_program_info($program_id){
        global $db;
        $query = "SELECT p.id, p.major_id, p.year, p.credits, p.elective_credits, p.active, m.name 
                    FROM programs p 
                    JOIN majors m ON p.major_id = m.id
                    WHERE p.id = :program_id";
        $program = get_from_db($query, [":program_id"=> $program_id]);


        if(!$program){
            $error= "Could not get program info";
            include("../errors/error.php");

        }
        else return $program;
    }


    function get_program_roster($program_id){
        global $db;
        $query = "SELECT
                        s.last,
                        s.first,
                        CONCAT(s.last, \",\", s.first),
                        s.cwu_id,
                        s.email,
                        u.name AS advisor
                    FROM students s
                        JOIN student_programs sp ON s.cwu_id = sp.student_id
                        JOIN users u ON sp.user_id = u.id
                    WHERE
                        sp.program_id = :program_id
                        AND
                        s.active = 'YES'
                    ORDER BY
                        s.last, s.first ASC
                        ";
        $roster = get_from_db($query, [':program_id'=> $program_id]);
        

        if(!$roster){
            $error = "Cound not generate program roster";
            //include ('../errors/error.php');
        }
        else return $roster;
    }

    function add_program($user_id, $major_id, $year, $template_id){
        $program_id = 0;
        if($template_id == 0){
            $query = " INSERT INTO 
                        programs(major_id, year)
                        VALUES
                        :major_id, :year";
            $data_array = [":major_id" => $major_id, ":year" => $year];
            add_db($query, $data_array);
        }
        else{
            $query = "INSERT INTO 
                        programs(major_id, year, credits, elective_credits)
                        ";
        }
    }
}