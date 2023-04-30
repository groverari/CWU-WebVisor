<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Replacement.php';

    $replacement = new Replacement;

    $request;

    //properties of table;

    $id;
    $program_id;
    $required_id;
    $replacement_id;
    $note;

    //checks url for table
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
    }
    if(isset($_GET['required_id']))
    {
        $required_id = $_GET['required_id'];
    }
    if(isset($_GET['replacement_id']))
    {
        $replacement_id = $_GET['replacement_id'];
    }
    if(isset($_GET['note']))
    {
        $note = $_GET['note'];
    }


       

        //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }


    switch($request){
        
        case 'addReplacement':
            $result = $replacement ->addReplacement($user_id, $program_id, $replaced_id, $replacement_id);
            break;
        case 'removeReplacement':
            $result = $replacement ->removeReplacement($user_id, $program_id, $replaced_id, $replacement_id);
            break;
        case 'getReplacementClasses':
            $result = $replacement ->getReplacement($program_id);
            break;
        case 'record_update_program':
            $result = $replacement -> record_update_program($user_id, $program_id, $note);
            break;
        default:
            echo 'request incorrrect';
            break;
    
    }