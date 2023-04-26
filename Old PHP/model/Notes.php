<?php
include_once 'PDO-methods.php';

class Notes 
{
    private $db;
    private $table = 'notes';


    // Retrieves all notes for a given student.
    public function get_notes($student_id) 
    {
        $query = "SELECT Notes.id, datetime, note, flagged, name 
                  FROM Notes JOIN Users ON Notes.user_id=Users.id 
                  WHERE Notes.student_id=? ORDER BY Notes.flagged, Notes.datetime DESC";
        $notes = $this->db->get_from_db($query, [$student_id]);

        $formatted_notes = array();
        foreach ($notes as $row) 
        {
            if ($row['name'] == '') 
            {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime']));
            } 
            else 
            {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime'])) . " &mdash; " . $row['name'];
            }
            $note = $row['note'];
            $flagged = $row['flagged'];
            $formatted_notes[$row['id']] = array('tag' => $tag, 'note' => $note, 'flagged' => $flagged);
        }

        return $formatted_notes;
    }

    // Adds a new note to the database with the given information.
    public function add_note($user_id, $student_id, $note, $flagged) 
    {
        $YES = "yes";
        $NO = "no";

        $escaped_note = htmlspecialchars(strip_tags($note));

        $flagged_text = ($flagged ? $YES : $NO);
        $query = "INSERT INTO Notes (user_id, student_id, note, flagged, datetime) VALUES (?, ?, ?, ?, NOW())";
        $this->db->add_db($query, [$user_id, $student_id, $escaped_note, $flagged_text]);
        $note_id = $this->db->lastInsertId();

        if ($this->db->row_count() > 0) 
        {
            $note_text = "<note:$note_id> added to <student:$student_id>.";
            record_update_student($user_id, $student_id, $note_text);
        }
    }

    // Updates all notes for a given student to remove any existing flags, then adds flags to the notes specified in the array.
    public function update_notes($student_id, $flagged_ids) 
    {
        $YES = "yes";
        $NO = "no";

        $query = "UPDATE Notes SET flagged=? WHERE student_id=?";
        $this->db->update_db($query, [$NO, $student_id]);

        foreach ($flagged_ids as $flagged_id) 
        {
            $query = "UPDATE Notes SET flagged=? WHERE id=?";
            $this->db->update_db($query, [$YES, $flagged_id]);
        }
    }
}

