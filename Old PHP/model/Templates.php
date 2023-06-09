<?php
 include_once 'PDO-methods.php';
 include_once 'Journals.php';

class Templates 
{
    private $db;
    private $table = 'templates';


    // Retrieves templates for a given program ID.
    public function getTemplates($program_id)
    {
        $query = "SELECT id, name FROM " . $this->table . " WHERE program_id = ?";
        $templates = $this->db->get_from_db($query, [$program_id]);
        return $templates;
    }

    // Retrieves named templates (excluding the "** New **" template) for a given program ID.
    public function getNamedTemplates($program_id)
    {
        $query = "SELECT id, name FROM " . $this->table . " WHERE program_id = ? AND name != '** New **'";
        $templates = $this->db->get_from_db($query, [$program_id]);
        return $templates;
    }

    // Creates a new template with the given program ID, name, and optional mimic ID.
    public function createTemplate($user_id, $program_id, $name, $mimic_id)
    {
        $query = "INSERT INTO " . $this->table . " (program_id, name) VALUES (?, ?)";
        $this->db->add_db($query, [$program_id, $name]);
        $template_id = $this->db->lastInsertId();

        if ($mimic_id != 0)
        {
            $query = "INSERT INTO Template_Classes (template_id, class_id, quarter, year) SELECT ?, class_id, quarter, year FROM Template_Classes WHERE template_id = ?";
            $this->db->add_db($query, [$template_id, $mimic_id]);
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
        $template_info = $this->db->get_from_db($query, [$template_id]);
        return $template_info[0];
    }
}
