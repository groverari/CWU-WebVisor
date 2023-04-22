<?php
class Notes {

    private $conn;
    private $table = 'notes';

    public $id;
    public $student_id;
    public $datetime;
    public $flagged;
    public $note;
    public $user_id;

    public function __construct($db) {
        $this->conn = $db;
    }

    //take $student_id as paarameter and retrives all notes fo that stednet form
    public function get_notes($student_id) {
        $query_string = "
            SELECT
                Notes.id,
                datetime,
                note,
                flagged,
                name
            FROM
                Notes JOIN Users ON Notes.user_id=Users.id
            WHERE
                Notes.student_id=?
            ORDER BY
                Notes.flagged, Notes.datetime DESC
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(1, $student_id);
        $stmt->execute();

        $notes = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            if ($row['name'] == '') {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime']));
            } else {
                $tag = date('M j Y @ g:i a', strtotime($row['datetime'])) . " &mdash; " . $row['name'];
            }
            $note = $row['note'];
            $flagged = $row['flagged'];
            $notes[$row['id']] = array('tag' => $tag, 'note' => $note, 'flagged' => $flagged);
        }

        //it returns them as an associative array after formating.
        return $notes;
    }

    // This function takes a user ID, student ID, note, and flagged 
    // status as parameters and adds a new note to the database with the given information.
    public function add_note($user_id, $student_id, $note, $flagged) {
        global $YES;
        global $NO;

        $escaped_note = htmlspecialchars(strip_tags($note));

        $flagged_text = ($flagged ? $YES : $NO);
        $query_string = "
            INSERT INTO Notes
                (user_id, student_id, note, flagged, datetime)
            VALUES
                (?, ?, ?, ?, NOW())
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(1, $user_id);
        $stmt->bindParam(2, $student_id);
        $stmt->bindParam(3, $escaped_note);
        $stmt->bindParam(4, $flagged_text);
        $stmt->execute();

        $note_id = $this->conn->lastInsertId();

        if ($stmt->rowCount() > 0) {
            $note = "<note:$note_id> added to <student:$student_id>.";
            record_update_student($user_id, $student_id, $note);
        }
    }

    //updates all notes for the given student to remove any existing flags, 
    //then adds flags to the notes specified in the array.
    public function update_notes($student_id, $flagged_ids) {
        global $YES;
        global $NO;

        $query_string = "
            UPDATE Notes
            SET
                flagged='$NO'
            WHERE
                student_id=?
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(1, $student_id);
        $stmt->execute();

        foreach ($flagged_ids as $flagged_id) {
            $query_string = "
                UPDATE Notes
                SET
                    flagged='$YES'
                WHERE
                    id=?
            ";
            $stmt = $this->conn->prepare($query_string);
            $stmt->bindParam(1, $flagged_id);
            $stmt->execute();
        }
    }
}
