<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Journals.php';


    $journal = new Journals();

    $request;

    //table properties
    $id;
    $user_id;
    $date;
    $note;
    $student_id;
    $class_id;
    $program_id;
    $major_id;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['user_id']))
    {
        $user_id = $_GET['user_id'];
    }
    if(isset($_GET['date']))
    {
        $date = $_GET['date'];
    }
    if(isset($_GET['note']))
    {
        $note = $_GET['note'];
    }
    if(isset($_GET['student_id']))
    {
        $student_id = $_GET['student_id'];
    }
    if(isset($_GET['class_id']))
    {
        $class_id = $_GET['class_id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
        
    } 
    if(isset($_GET['major_id']))
    {
        $major_id = $_GET['major_id'];
    }

    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    //calls function based on url request
    switch ($request) 
    {
        case 'read':
            $result = $journal->read();
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
                   