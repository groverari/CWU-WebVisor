
<?php
include_once 'pdo-methods.php';

class Student_checklists 
{
    private $db;
    
    private $table = 'student_checklists';

      // clears all checklists for a given student and program id.
      public function clearchecklist($user_id, $student_id, $program_id)
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
    public function checkchecklist($user_id, $student_id, $checklist_id)
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
    public function updatechecklist($user_id, $student_id, $program_id, $checklist_ids)
    {
        $this->clearchecklist($user_id, $student_id, $program_id);
        
        foreach ($checklist_ids as $checklist_id)
        {
            $this->checkchecklist($user_id, $student_id, $checklist_id);
        }
    }
    //retrive a list of checked checklist items for  a given student and program
    public function get_checked_items($user_id, $student_id, $program_id)
    {
        $query = "select student_checklists.checklist_id
                  from student_checklists
                  join checklists on student_checklists.checklist_id=checklists.id
                  where student_id=?
                  and program_id=?";
        $stmt = $this->db->get_from_db($query, [$student_id, $program_id]);
        
        $checked_items = array();
        foreach ($stmt as $row)
        {
            $checked_items[] = $row['checklist_id'];
        }

        $note = "retrieved checked items for <student:$student_id>.";
        record_update_student($user_id, $student_id, $note);

        return $checked_items;
    }
}