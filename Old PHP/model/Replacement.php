<?php
class Replacement_Classes{

    private $conn;
    private $table ='replacement_classes';

    public $id;
    public $program_id;
    public $required_id;
    public $replacement_id;
    public $note;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function add_replacement($user_id, $program_id, $replaced_id, $replacement_id)
    {
        $query = "INSERT INTO " . $this->table . " (program_id, required_id, replacement_id) VALUES (:program_id, :required_id, :replacement_id)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':program_id', $program_id);
        $stmt->bindParam(':required_id', $replaced_id);
        $stmt->bindParam(':replacement_id', $replacement_id);

        if($stmt->execute()){
            $note = "Added <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
            $this->record_update_program($user_id, $program_id, $note);
            return true;
        }

        return false;
    }

    public function remove_replacement($user_id, $program_id, $replaced_id, $replacement_id)
    {
        $query = "DELETE FROM " . $this->table . " WHERE program_id = :program_id AND required_id = :required_id AND replacement_id = :replacement_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':program_id', $program_id);
        $stmt->bindParam(':required_id', $replaced_id);
        $stmt->bindParam(':replacement_id', $replacement_id);

        if($stmt->execute()){
            $note = "Removed <replacement:$replacement_id> as replacement for <replaced:$replaced_id> in <program:$program_id>.";
            $this->record_update_program($user_id, $program_id, $note);
            return true;
        }

        return false;
    }

    public function get_replacement_classes($program_id)
    {
        $query = "SELECT Replacement_Classes.required_id, Replacement_Classes.replacement_id, Req.name AS required_name, Rep.name AS replacement_name, Replacement_Classes.note AS note FROM Replacement_Classes JOIN Classes AS Rep ON Replacement_Classes.replacement_id = Rep.id JOIN Classes AS Req ON Replacement_Classes.required_id = Req.id WHERE Replacement_Classes.program_id = :program_id";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':program_id', $program_id);

        $stmt->execute();

        $replacement_classes = array();

        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            if (!isset($replacement_classes[$required_id]))
            {
                $replacement_classes[$required_id] = array('name' => $required_name);
                $replacement_classes[$required_id]['replacements'] = array();
            }

            $replacement_classes[$required_id]['replacements'][] = array('id' => $replacement_id, 'name' => $replacement_name, 'note' => $note);
        }

        return $replacement_classes;
    }

    private function record_update_program($user_id, $program_id, $note)
    {
        // I am not too sure if we have to do this--- may be Arish can help here.
        $query = "INSERT INTO program_updates (user_id, program_id, note) VALUES (:user_id, :program_id, :note)";
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':program_id', $program_id);
        $stmt->bindParam(':note', $note);
    
        if ($stmt->execute()) {
            return true;
        } else {
            printf("Error: %s.\n", $stmt->error);
    
            return false;
        }
    }

}

