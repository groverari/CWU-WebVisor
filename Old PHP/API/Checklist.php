<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Checklists.php';

    $checklists = new Checklists();

    $request;

    //table attributes
    $id;
    $program_id;
    $sequence;
    $name;

    //needed vars for some functions
    $user_id;
    $checklist_items;

    if(isset($_GET['program_id']))
     {
         $program_id = $_GET['program_id'];
     }
     if(isset($_GET['sequence']))
     {
         $sequence = $_GET['sequence'];
     }
     if(isset($_GET['name']))
     {
         $name = $_GET['name'];
     }
     if(isset($_GET['id']))
     {
         $id = $_GET['id'];
     }
     if(isset($_GET['user_id']))
     {
         $user_id = $_GET['user_id'];
     }
     if(isset($_GET['checklist_items']))
     {
         $checklist_items = $_GET['checklist_items'];
     }
    
     //checks url for request variable
     if(isset($_GET['request']))
     {
         $request = $_GET['request'];
     }

     //calls function based on url request
    switch ($request) 
    {
        case 'get_checklist':
            $result = $checklists->get_checklist($program_id);
            echo json_encode($result);
            break;
        case 'update_checklist_sequence':
            $checklists->update_checklist_sequence($user_id, $program_id, $checklist_items);
            break;
        case 'add_checklist_item':
            $checklists->add_checklist_item($user_id, $program_id, $name);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
