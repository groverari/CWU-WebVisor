<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Majors.php';
    
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //validate api key before moving forward

    $request = $data['request'];
    //calls function based on url request
    switch ($request) 
    {
        case 'read':
            $result = all_majors();
            echo json_encode($result);
            break;
        case 'readSingle':
            $result = $majors->readSingle($id);
            echo json_encode($result);
            break;
        case 'create':
            $majors->create($name, $active);
            break;
        case 'update':
            $majors->update($id, $name, $active);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
    