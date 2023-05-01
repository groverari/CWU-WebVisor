<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Notes.php';

    $note = new Notes();

    $request;


    //table properties
    $id;
    $student_id;
    $datetime;
    $flagged;
    $note;
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
    if(isset($_GET['datetime']))
    {
        $datetime = $_GET['datetime'];
    }
    if(isset($_GET['flagged']))
    {
        $flagged = $_GET['flagged'];
    }
    if(isset($_GET['note']))
    {
        $note = $_GET['note'];
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

    switch($request)
    {
        case 'get_notes':
            $result = $note ->get_notes($student_id);
            echo json_encode($result);
            break;
        case 'add_note':
            $result = $note ->add_note($user_id, $student_id, $note, $flagged);
            break;
        case 'update_notes':
            $result = $note ->update_notes($student_id, $flagged_ids);
            break;
        default:
            echo 'request incorrrect';
            break;
    }