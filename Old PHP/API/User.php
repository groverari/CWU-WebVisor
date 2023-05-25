<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Users.php';


    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $request = $data['request'];

    //calls function based on url request
    switch ($request) 
    {
        case 'getUser':
            $result = getUser($data['login'], $data['password']);
            echo json_encode($result);
            break;
        case 'read':
            $result = read();
            echo json_encode($result);
            break;
        case 'update_user_simple':
            $result = update_user_simple($data['user_id'], $data['password'], $data['login'], $data['superuser']);
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
