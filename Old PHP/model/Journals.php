<?php

include_once 'PDO-methods.php';
include_once 'Journals.php';

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
   

// Retrieves a list of journal entries, 
//including details about the user, student, class, program, major, and note.
    public function read()
    {
        $query = "
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

        $result = get_from_db( $query);
        return $result;
    }

    //the journal is only ever updated within the program, so all update functions can be private
    
    //Inserts a new journal entry indicating that a user updated a major, including 
    //the user ID, major ID, and note.
    public function record_update_major($user_id, $major_id, $note)
    {
        $query = "
            INSERT INTO journal (user_id, major_id, note)
            VALUES (:user_id, :major_id, :note)
        ";
        
        $dataArr = [':user_id'=>$user_id, ':major_id'=>$major_id, ':note'=>$note];
        $result = add_db( $query, $dataArr);
        return $result;
    }
// Inserts a new journal entry indicating that a user updated a program, 
//including the user ID, program ID, and note.
    public function record_update_program($user_id, $program_id, $note)
    {
        $query = "
            INSERT INTO journal (user_id, program_id, note)
            VALUES (:user_id, :program_id, :note)
        ";

        $dataArr = [':user_id'=>$user_id, ':program_id'=>$program_id, ':note'=>$note];
        $result = add_db( $query, $dataArr);
        return $result;
    }
//Inserts a new journal entry indicating that a user updated a class,
// including the user ID, class ID, and note.
    public function record_update_class($user_id, $class_id, $note)
    {
        $query = "
            INSERT INTO journal (user_id, class_id, note)
            VALUES (:user_id, :class_id, :note)
        ";
        $dataArr = [':user_id'=>$user_id, ':class_id'=>$class_id, ':note'=>$note];
        $result = add_db( $query, $dataArr);
        return $result;
    }
//Inserts a new journal entry indicating that a user updated a student, 
//including the user ID, student ID, and note.
    public function record_update_student($user_id, $student_id, $note)
    {
        $query = "
            INSERT INTO journal (user_id, student_id, note)
            VALUES (:user_id, :student_id, :note)
        ";
        $dataArr = [':user_id'=>$user_id, ':student_id'=>$student_id, ':note'=>$note];
        $result = add_db( $query, $dataArr);
        return $result;
    }
}