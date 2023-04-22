<?php

class Journals 
{
    private $conn;
    private $table = 'journal';

    public $id;
    public $user_id;
    public $date;
    public $note;
    public $student_id;
    public $class_id;
    public $program_id;
    public $major_id;
   

    public function __construct($db) 
    {
        $this->conn = $db;
    }
// Retrieves a list of journal entries, 
//including details about the user, student, class, program, major, and note.
    public function get_journal($cleanup = false, $user_id = 0, $student_id = 0, $class_id = 0, $program_id = 0, $major_id = 0)
    {
        $query_string = "
            SELECT
                journal.date,
                users.name AS user_name,
                CONCAT(students.last, \", \", students.first) AS student_name,
                classes.name AS class_name,
                programs.year AS program_name,
                majors.name AS major_name,
                note
            FROM 
                journal
                LEFT JOIN users ON journal.user_id = users.id
                LEFT JOIN students ON journal.student_id = students.id
                LEFT JOIN classes ON journal.class_id = classes.id
                LEFT JOIN programs ON journal.program_id = programs.id
                LEFT JOIN majors ON journal.major_id = majors.id
            ORDER BY
                date DESC
            LIMIT
                100;
        ";

        $stmt = $this->conn->prepare($query_string);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }
//Inserts a new journal entry indicating that a user updated a major, including 
//the user ID, major ID, and note.
    public function record_update_major($user_id, $major_id, $note)
    {
        $query_string = "
            INSERT INTO journal (user_id, major_id, note)
            VALUES (:user_id, :major_id, :note)
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':major_id', $major_id);
        $stmt->bindParam(':note', $note);
        $stmt->execute();
    }
// Inserts a new journal entry indicating that a user updated a program, 
//including the user ID, program ID, and note.
    public function record_update_program($user_id, $program_id, $note)
    {
        $query_string = "
            INSERT INTO journal (user_id, program_id, note)
            VALUES (:user_id, :program_id, :note)
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':program_id', $program_id);
        $stmt->bindParam(':note', $note);
        $stmt->execute();
    }
//Inserts a new journal entry indicating that a user updated a class,
// including the user ID, class ID, and note.
    public function record_update_class($user_id, $class_id, $note)
    {
        $query_string = "
            INSERT INTO journal (user_id, class_id, note)
            VALUES (:user_id, :class_id, :note)
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':class_id', $class_id);
        $stmt->bindParam(':note', $note);
        $stmt->execute();
    }
//Inserts a new journal entry indicating that a user updated a student, 
//including the user ID, student ID, and note.
    public function record_update_student($user_id, $student_id, $note)
    {
        $query_string = "
            INSERT INTO journal (user_id, student_id, note)
            VALUES (:user_id, :student_id, :note)
        ";
        $stmt = $this->conn->prepare($query_string);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':student_id', $student_id);
        $stmt->bindParam(':note', $note);
        $stmt->execute();
    }
}