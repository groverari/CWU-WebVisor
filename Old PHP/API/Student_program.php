<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Student_Programs.php';

    $studentProgram = new Student_Programs();

    $request;

    $id;
    $student_id;
    $program_id;
    $user_id;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['student_id']))
    {
        $student_id = $_GET['student_id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
    }
    if(isset($_GET['user_id']))
    {
        $user_id = $_GET['user_id'];
    }

     //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

     //calls function based on url request
    switch ($request) 
    {
        case 'student_in_program':
            $result = $studentProgram->student_in_program();
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }