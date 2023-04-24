<?php

class Template_Class 
{
    private $conn;
    private $table = 'template_classes';

    public $id;
    public $template_id;
    public $class_id;
    public $quarter;
    public $year;
   

    public function __construct($db) 
    {
        $this->conn = $db;
    }
    //Retrieves template classes based on the template ID.
    public function get_template_classes($template_id)
    {
        $query_string = "SELECT class_id, quarter, year FROM template_classes WHERE template_id = :template_id";
        $query = $this->conn->prepare($query_string);
        $query->bindParam(':template_id', $template_id);
        $query->execute();
        $template_classes = array();
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) 
        {
            extract($row);
            $template_class_item = array(
                'class_id' => $class_id,
                'quarter' => $quarter,
                'year' => $year
            );
            $template_classes[] = $template_class_item;
        }
        return $template_classes;
    }
    //Updates the template name and associated template classes.
    public function update_template($template_id, $name, $template)
    {
        try {
            $this->conn->beginTransaction();
            $query_string = "UPDATE templates SET name = :name WHERE id = :template_id";
            $query = $this->conn->prepare($query_string);
            $query->bindParam(':name', $name);
            $query->bindParam(':template_id', $template_id);
            $query->execute();
            $query_string = "DELETE FROM template_classes WHERE template_id = :template_id";
            $query = $this->conn->prepare($query_string);
            $query->bindParam(':template_id', $template_id);
            $query->execute();
            foreach ($template as $class_id => $qtr_year) 
            {
                $qtr = $qtr_year["qtr"];
                $year = $qtr_year["year"];
                $query_string = "INSERT INTO template_classes (template_id, class_id, quarter, year) 
                                 VALUES (:template_id, :class_id, :qtr, :year) 
                                 ON DUPLICATE KEY UPDATE quarter = :qtr, year = :year";
                $query = $this->conn->prepare($query_string);
                $query->bindParam(':template_id', $template_id);
                $query->bindParam(':class_id', $class_id);
                $query->bindParam(':qtr', $qtr);
                $query->bindParam(':year', $year);
                $query->execute();
            }
            $this->conn->commit();
        } catch (PDOException $e) {
            $this->conn->rollBack();
            throw $e;
        }
    }
}


