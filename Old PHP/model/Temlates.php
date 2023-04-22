<?php

class Templates 
{
    private $conn;
    private $table = 'templates';

    public $id;
    public $program_id;
    public $name;

    public function __construct($db) 
    {
        $this->conn = $db;
    }
//Retrieves templates for a given programID
    public function getTemplates($program_id)
    {
        $query = "SELECT id, name FROM " . $this->table . " WHERE program_id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $program_id);
        $stmt->execute();

        $templates = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $name = $row['name'];
            $templates[$id] = $name;
        }

        return $templates;
    }
// Retrieves named templates (excluding the "** New **" template) for a given program ID.
    public function getNamedTemplates($program_id)
    {
        $query = "SELECT id, name FROM " . $this->table . " WHERE program_id = ? AND name != '** New **'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $program_id);
        $stmt->execute();

        $templates = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $id = $row['id'];
            $name = $row['name'];
            $templates[$id] = $name;
        }

        return $templates;
    }
//Creates a new template with the given program ID, name, and optional mimic ID.
    public function createTemplate($user_id, $program_id, $name, $mimic_id)
    {
        $query = "INSERT INTO " . $this->table . " (program_id, name) VALUES (?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $program_id);
        $stmt->bindParam(2, $name);
        $stmt->execute();

        $template_id = $this->conn->lastInsertId();

        if ($mimic_id != 0)
        {
            $query = "INSERT INTO Template_Classes (template_id, class_id, quarter, year) SELECT ?, class_id, quarter, year FROM Template_Classes WHERE template_id = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $template_id);
            $stmt->bindParam(2, $mimic_id);
            $stmt->execute();
        }

        if ($template_id > 0)
        {
            $note = "Created <template:$template_id> for <program:$program_id>.";
            record_update_program($user_id, $program_id, $note);
        }

        return $template_id;
    }
// Retrieves information (program ID and name) for a given template ID.
    public function getTemplateInfo($template_id)
    {
        $query = "SELECT program_id, name FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $template_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row;
    }
}
