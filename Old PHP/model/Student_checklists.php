
<?php
include_once 'pdo-methods.php';


      // clears all checklists for a given student and program id.
      function clearchecklist($user_id, $student_id, $program_id)
      {
          $query = "delete student_checklists from student_checklists join checklists on student_checklists.checklist_id = checklists.id where student_id = ? and program_id = ?";
          $stmt = $this->db->add_db($query, [$student_id, $program_id]);
          
          if ($stmt->rowcount() > 0)
          {
              $note = "cleared <student:$student_id> checklists for <program:$program_id>.";
              record_update_student($user_id, $student_id, $note);
          }
      }


    // checks a given checklist item for a given student.
    function checkchecklist($user_id, $student_id, $checklist_id)
    {
        $query = "insert into student_checklists (checklist_id, student_id) values (?, ?)";
        $stmt = $this->db->add_db($query, [$checklist_id, $student_id]);
        
        if ($stmt->rowcount() > 0)
        {
            $note = "checked <checklist_item:$checklist_id> for <student:$student_id>.";
            record_update_student($user_id, $student_id, $note);
        }
    }

    // updates all checklists for a given student and program id, based on an array of checklist ids.
    function updatechecklist($user_id, $student_id, $program_id, $checklist_ids)
    {
        $this->clearchecklist($user_id, $student_id, $program_id);
        
        foreach ($checklist_ids as $checklist_id)
        {
            $this->checkchecklist($user_id, $student_id, $checklist_id);
        }
    }
    //retrive a list of checked checklist items for  a given student and program
    function get_checked_items($student_id, $program_id)
	{
        $query_string = "
        SELECT
            student_checklists.checklist_id
        FROM
            student_checklists JOIN checklists ON student_checklists.checklist_id=checklists.id
        WHERE
            student_id=:student_id
            AND
            program_id=:program_id
        ;";
        $dataArr = [':student_id'=>$student_id, ':program_id'=>$program_id];
        $query_result = get_from_db($query_string, $dataArr);;
        
        $checked_items = array();
        foreach ($query_result as $row)
        {
            $checked_items[] = $row['checklist_id'];
        }
        
        return $checked_items;
    }