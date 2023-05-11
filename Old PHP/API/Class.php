<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Classes.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $classes = new Classes();

    $request = $data['request'];

     //calls function based on url request
    switch ($request) 
    {
        case 'all_classes':
            $result = $classes->all_classes($program_id);
            echo json_encode($result);
            break;
        case 'add_class':
            $result = $classes->add_class($user_id, $name, $credits, $title, $fall, $winter, $spring, $summer);
            echo json_encode($result);
            break;
        case 'get_class_info':
            $result = $classes->get_class_info($id, $program_id);
            echo json_encode($result);
            break;
        case 'all_active_classes':
            $result = $classes->get_all_classes();
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }