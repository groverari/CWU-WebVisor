<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../config/Database.php';
    include_once '../model/Electives.php';

    $elective = new Electives();

    $request;

    //table properties
    $id;
    $student_class_id;
    $program_id;

     //checks url for table variables
     if(isset($_GET['student_class_id']))
     {
         $student_class_id = $_GET['student_class_id'];
     }
     if(isset($_GET['program_id']))
     {
         $program_id = $_GET['program_id'];
     }
     if(isset($_GET['id']))
     {
         $id = $_GET['id'];
     }

     //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    //calls function based on url request
    switch ($request) 
    {
        case 'add_student_elective':
            $result = $elective->add_student_elective($student_class_id, $program_id);
            break;
        default:
            echo 'request incorrrect';
            break;
    }