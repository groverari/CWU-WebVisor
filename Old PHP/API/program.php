<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Programs.php';

    $programs = new Programs();

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    //validate api key before moving forward

    $request = $data['request'];

     //calls function based on url request
    switch ($request) 
    {
        case 'get_program_id':
            // $result = $programs->get_program_id($major_id, $catalog_year);
            // echo json_encode($result);
            break;
        case 'all_programs':
            $result = $programs->all_programs($data['user_id']);
            echo json_encode($result);
            break;
        case 'get_program_info':
            // $result = $programs->get_program_info($id);
            // echo json_encode($result);
            break;
        case 'get_program_roster':
            // $result = $programs->get_program_roster($id);
            // echo json_encode($result);
            break;
        case 'add_program':
            //$programs->add_program($user_id, $major_id, $year, $template_id);
            break;
        case 'update':
            $result = $programs->update_program($data['user_id'], $data['id'], $data['major_id'], $data['year'], $data['credits'], $data['elective_credits'], $data['active']);
            echo json_encode($result);
            break;
            //$programs->update_program($user_id, $id, $major_id, $year, $credits, $elective_credits, $active);
        default:
            echo 'request incorrrect';
            break;
    }