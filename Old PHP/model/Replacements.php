<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Replacements {
    private $db;
    private $table = 'replacement_classes';

    public function __construct($db) {
        $this->db = $db;
    }

    // Adds a replacement class to a program.
    public function addReplacement($user_id, $program_id, $replaced_id, $replacement_id) {
        $query = "INSERT INTO " . $this->table . " (program_id, required_id, replacement_id) VALUES (?, ?, ?)";
        $this->db->add_db($query, [$program_id, $replaced_id, $replacement_id]);

        $note = "Added <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
        $this->record_update_program($user_id, $program_id, $note);
    }

    // Removes a replacement class from a program.
    public function removeReplacement($user_id, $program_id, $replaced_id, $replacement_id) {
        $query = "DELETE FROM " . $this->table . " WHERE program_id = ? AND required_id = ? AND replacement_id = ?";
        $this->db->delete_from_db($query, [$program_id, $replaced_id, $replacement_id]);

        $note = "Removed <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
        $this->record_update_program($user_id, $program_id, $note);
    }

    // Gets all replacement classes for a program.
    public function getReplacementClasses($program_id) {
        $query = "SELECT replacement_classes.required_id, replacement_classes.replacement_id, req.name AS required_name, rep.name AS replacement_name, replacement_classes.note AS note FROM " . $this->table . " JOIN classes AS rep ON replacement_classes.replacement_id = rep.id JOIN classes AS req ON replacement_classes.required_id = req.id WHERE replacement_classes.program_id = ?";
        $replacement_classes = $this->db->get_from_db($query, [$program_id]);
        return $replacement_classes;
    }

    // Logs a program update with the given note.
    private function record_update_program($user_id, $program_id, $note) {
        $query = "INSERT INTO program_updates (user_id, program_id, note) VALUES (?, ?, ?)";
        $this->db->add_db($query, [$user_id, $program_id, $note]);
    }
}

