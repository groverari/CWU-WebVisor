<?php
include_once 'PDO-methods.php';

class Checklists 
{
    private $db;
    private $table = 'checklists';


    // Clears all checklists for a given student and program ID.
    public function clearChecklist($user_id, $student_id, $program_id)
    {
        $query = "DELETE Student_Checklists FROM Student_Checklists JOIN Checklists ON Student_Checklists.checklist_id = Checklists.id WHERE student_id = ? AND program_id = ?";
        $stmt = $this->db->add_db($query, [$student_id, $program_id]);
        
        if ($stmt->rowCount() > 0)
        {
            $note = "Cleared <student:$student_id> checklists for <program:$program_id>.";
            record_update_student($user_id, $student_id, $note);
        }
    }

    // Checks a given checklist item for a given student.
    public function checkChecklist($user_id, $student_id, $checklist_id)
    {
        $query = "INSERT INTO Student_Checklists (checklist_id, student_id) VALUES (?, ?)";
        $stmt = $this->db->add_db($query, [$checklist_id, $student_id]);
        
        if ($stmt->rowCount() > 0)
        {
            $note = "Checked <checklist_item:$checklist_id> for <student:$student_id>.";
            record_update_student($user_id, $student_id, $note);
        }
    }

    // Updates all checklists for a given student and program ID, based on an array of checklist IDs.
    public function updateChecklist($user_id, $student_id, $program_id, $checklist_ids)
    {
        $this->clearChecklist($user_id, $student_id, $program_id);
        
        foreach ($checklist_ids as $checklist_id)
        {
            $this->checkChecklist($user_id, $student_id, $checklist_id);
        }
    }
//Retrive a list of checked checklist items for  a given student and program
    public function get_checked_items($user_id, $student_id, $program_id)
    {
        $query = "SELECT Student_Checklists.checklist_id
                  FROM Student_Checklists
                  JOIN Checklists ON Student_Checklists.checklist_id=Checklists.id
                  WHERE student_id=?
                  AND program_id=?";
        $stmt = $this->db->get_from_db($query, [$student_id, $program_id]);
        
        $checked_items = array();
        foreach ($stmt as $row)
        {
            $checked_items[] = $row['checklist_id'];
        }

        $note = "Retrieved checked items for <student:$student_id>.";
        record_update_student($user_id, $student_id, $note);

        return $checked_items;
    }

}

