<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Student_Programs.php';

    $studentProgram = new Student_Programs();

    $request;

    //attributes of the tables
    $id;
    $student_id;
    $program_id;
    $user_id;

    //needed parameters for some methods
    $advisor_id

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
    if(isset($_GET['advisor_id']))
    {
        $advisor_id = $_GET['advisor_id'];
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
            $result = $studentProgram->student_in_program($student_id, $program_id);
            echo json_encode($result);
            break;
        case 'update_student_advisor':
            $result = $studentProgram->update_student_advisor($user_id, $student_id, $program_id, $advisor_id);
            break;
        case 'get_student_program_advisor':
            $result = $studentProgram->get_student_program_advisor($student_id, $program_id)
            echo json_encode($result)
            break;
        default:
            echo 'request incorrrect';
            break;
    }