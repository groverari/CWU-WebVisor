<?php 

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");  
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../config/Database.php';
    include_once '../model/Students.php';
    
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //validate api key before moving forward

    $request = $data['request'];

    $student = new Students();

    switch($request){
        case 'all_active_students':
            $data = $student-> get_all_active_students();
            echo json_encode($data);
            break;
        case 'activate_student':
                $result = $student->activate_student($data['id']);
                echo json_encode($result);
                break;
        case 'add':
            echo(json_encode($data));
            break;
    }