<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';


    // Retrieves all notes for a given student.
    function get_notes($student_id) 
    {
        $query = "SELECT notes.id, datetime, note, flagged, name 
                  FROM notes JOIN users ON notes.user_id=users.id 
                  WHERE notes.student_id=:student_id ORDER BY notes.flagged, notes.datetime DESC";
        $notes = get_from_db($query, ['student_id'=>$student_id]);

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
    function add_note($user_id, $student_id, $note, $flagged) 
    {
        $YES = "yes";
        $NO = "no";

        $escaped_note = htmlspecialchars(strip_tags($note));

        $flagged_text = ($flagged ? $YES : $NO);
        $query = "INSERT INTO notes (user_id, student_id, note, flagged, datetime) VALUES (?, ?, ?, ?, NOW())";
        $this->db->add_db($query, [$user_id, $student_id, $escaped_note, $flagged_text]);
        $note_id = $this->db->lastInsertId();

        if ($this->db->rowCount() > 0) 
        {
            $note_text = "<note:$note_id> added to <student:$student_id>.";
            record_update_student($user_id, $student_id, $note_text);
        }
    }

    // Updates all notes for a given student to remove any existing flags, then adds flags to the notes specified in the array.
    function update_notes($student_id, $flagged_ids) 
    {
        $YES = "yes";
        $NO = "no";

        $query = "UPDATE notes SET flagged=? WHERE student_id=?";
        $this->db->update_db($query, [$NO, $student_id]);

        foreach ($flagged_ids as $flagged_id) 
        {
            $query = "UPDATE notes SET flagged=? WHERE id=?";
            $this->db->update_db($query, [$YES, $flagged_id]);
        }
    }

