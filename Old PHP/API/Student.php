<?php
    //headers
    
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
    
    switch($request){
        case 'all_active_students':
            $data =  get_all_active_students();
            echo json_encode($data);
            break;
        case 'all_inactive_students':
            $data=  get_all_inactive_students();
            echo json_encode($data);
            break;
        case 'change_activation':
            $result = change_activation($data['id'], $data['active']);
            echo json_encode($result);
            break;
        case 'add_student':
            $result = add_student($data['user_id'], $data['cwu_id'], $data['email'], $data['first'], $data['last']);
            echo json_encode($result);
            break;
        case 'update_student':
            $result = update_student($data['user_id'], $data['id'], $data['first'], $data['last'], $data['cwu_id'], 
            $data['email'], $data['phone'], $data['address'], $data['postbac'], $data['withdrawing'], $data['veterans'], $data['active']);
            echo json_encode($result);
            break;
        case 'get_bad_cwu_ids':
            $result = get_bad_cwu_ids();
            echo json_encode($result);
            break;
//new api call for enrollments
        case 'get_enrollments':
            $result = get_enrollments($year);
            echo json_encode($result);
            break;

        case 'add':
            echo(json_encode($data));
            break;
    }

   /*

     //calls function based on url request
    switch ($request) 
    {
        case 'update_student':
            $result = update_student($user_id, $student_id, $first, $last, $cwu_id, $email, $phone, $address, $postbaccalaureate, $withdrawing, $veterans_benefits, $active);
            break;
        case 'add_student':
            $result = add_student($user_id, $cwu_id, $email, $first, $last);
            echo json_encode($result);
            break;
        case 'get_student_info'://likely won't work because function calls on non-existing tables
            $result = get_student_info($id, $cwu_id, $email);
            echo json_encode($result);
            break;
        case 'cwu_id_to_student_id':
            $result = cwu_id_to_student_id($cwu_id);
            echo json_encode($result);
            break;
        case 'get_enrollments':
            $result = get_enrollments($year);
            echo json_encode($result);
            break;
        case 'all_students':
            $result = all_students($active_only = false);
            break;
        case 'get_bad_cwu_ids':
            $result = get_bad_cwu_ids();
            echo json_encode($result);
            break;
        case'student_for_user':
            $result = students_for_user($user_id);
            break;
        case 'active_students':
            $result =  get_all_active_students();
            echo json_encode($result);
            break;
        case 'inactive_students':
            $result =  get_all_inactive_students();
            echo json_encode($result);
            break;
        case 'activate_student':
            //$result = activate_student($id);
            echo json_encode($data);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
   */