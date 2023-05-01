<?php
include_once 'PDO-methods.php';
include_once 'Journals.php';

class Template_Class 
{
    private $db;
    private $table = 'template_classes';

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
//    Runction fills a student's class schedule with the classes 
//    defined in a given template for a specified year.
    public function fill_template($user_id, $student_id, $template_id, $template_year)
{
    try {
        $this->db->beginTransaction();

        $changed = false;

        if ($template_id != 0)
        {
            $query = "
                SELECT
                    class_id, quarter, year
                FROM
                    template_classes
                WHERE
                    template_id=:template_id
                    AND
                    year > 0
            ";

            $query_result = $this->db->select($query, ['template_id' => $template_id]);

            foreach ($query_result as $row)
            {
                $class_id = $row['class_id'];
                $qtr = $row['quarter'];
                $yr = $template_year + ($row['year'] - 1);
                $term = "$yr$qtr";

                $query = "
                    INSERT INTO
                        student_classes(student_id, class_id, term)
                    VALUES
                        (:student_id, :class_id, :term)
                ";

                $this->db->add_db($query, ['student_id' => $student_id, 'class_id' => $class_id, 'term' => $term]);
                $changed = $changed || ($this->db->rowCount() > 0);
            }
        }

        if ($changed)
        {
            $journ = new Journals();
            $note = "Filled <student:$student_id> with <template:$template_id>";
            $journ->record_update_student($user_id, $student_id, $note);
        }

        $this->db->commit();
    } catch (PDOException $e) {
        $this->db->rollBack();
        throw $e;
    }
}

}


