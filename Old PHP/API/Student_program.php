<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Student_Programs.php';

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $request = $data['request'];

     //calls function based on url request
    switch ($request) 
    {
        case 'programs_with_student':
            $result = programs_with_student($data['student_id']);
            echo json_encode($result);
            break;
        case 'add_student':
            $result = add_student_to_advisor($data['user_id'], $data['student_id'] , $data['program_id']);
            echo json_encode($result);
            break;
        case 'user_can_update_student':
            $result = user_can_update_student($user_id, $student_id);
            echo json_encode($result);
            break;
        case 'student_in_program':
            $result = student_in_program($student_id, $program_id);
            echo json_encode($result);
            break;
        case 'update_student_advisor':
            $result = update_student_advisor($user_id, $student_id, $program_id, $advisor_id);
            break;
        case 'get_student_program_advisor':
            $result = get_student_program_advisor($student_id, $program_id);
            echo json_encode($result);
            break;
        case 'update_student_programs':
            $result = update_student_programs($user_id, $student_id, $remove_programs, $add_program_id, $add_advisor_id, $non_stem_majors);
        default:
            echo 'request incorrrect';
            break;
    }