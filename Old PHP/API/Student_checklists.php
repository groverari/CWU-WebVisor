<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Student_checklists.php';

    $student_checklist = new Student_checklists;

    $request;

    //properties of table
    $id;
    $student_id;
    $checklist_id;

    //checks url for request variable

    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['student_id']))
    {
        $student_id = $_GET['student_id'];
    }
    if(isset($_GET['checklist_id']))
    {
        $checklist_id = $_GET['checklist_id'];
    }

    //calls funtions based on funtion 
    switch($request){

        case 'clearchecklist':
            $result = $student_checklist->clearchecklist($user_id, $student_id, $program_id);
            break;
        case 'checkchecklist':
            $result = $student_checklist->checkchecklist($user_id, $student_id, $checklist_id);
            break;
        case 'updatechecklist':
            $result = $student_chekcklist ->updatechecklist($user_id, $student_id, $program_id, $checklist_ids);
            break;
        case 'get_checked_items':
            $result = $student_checklist->get_checked_items($user_id, $student_id, $program_id);
            break;
        default:
            echo 'request incorrrect';
            break;
    }