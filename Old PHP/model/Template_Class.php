<?php
include_once 'PDO-methods.php';

class Template_Class 
{
    private $db;
    private $table = 'Template_Class';

    public function __construct($db) 
    {
        $this->db = $db;
    }

    // Retrieves template classes based on the template ID.
    public function get_template_classes($template_id)
    {
        $query = "SELECT class_id, quarter, year FROM " . $this->table . " WHERE template_id = ?";
        $template_classes = $this->db->get_from_db($query, [$template_id]);
        return $template_classes;
    }

    // Updates the template name and associated template classes.
    public function update_template($template_id, $name, $template)
    {
        try {
            $this->db->beginTransaction();

            $query = "UPDATE templates SET name = ? WHERE id = ?";
            $this->db->add_db($query, [$name, $template_id]);

            $query = "DELETE FROM " . $this->table . " WHERE template_id = ?";
            $this->db->add_db($query, [$template_id]);

            foreach ($template as $class_id => $qtr_year) 
            {
                $qtr = $qtr_year["qtr"];
                $year = $qtr_year["year"];
                $query = "INSERT INTO " . $this->table . " (template_id, class_id, quarter, year) 
                          VALUES (?, ?, ?, ?) 
                          ON DUPLICATE KEY UPDATE quarter = ?, year = ?";
                $this->db->add_db($query, [$template_id, $class_id, $qtr, $year, $qtr, $year]);
            }

            $this->db->commit();
        } catch (PDOException $e) {
            $this->db->rollBack();
            throw $e;
        }
    }
}


