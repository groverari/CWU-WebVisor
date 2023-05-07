<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Students.php';

    $student = new Students();

    $request;

    //attributes of the tables
    $id;
    $first;
    $last;
    $cwu_id;
    $email;
    $phone;
    $address;
    $postbaccalaureate;
    $withdrawing;
    $veterans_benefits;
    $active;
    $non_stem_majors;

    //needed parameters for some methods
    $user_id;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['first']))
    {
        $first = $_GET['first'];
    }
    if(isset($_GET['last']))
    {
        $last = $_GET['last'];
    }
    if(isset($_GET['cwu_id']))
    {
        $cwu_id = $_GET['cwu_id'];
    }
    if(isset($_GET['email']))
    {
        $email = $_GET['email'];
    }
    if(isset($_GET['phone']))
    {
        $phone = $_GET['phone'];
    }
    if(isset($_GET['address']))
    {
        $address = $_GET['address'];
    }
    if(isset($_GET['postbaccalaureate']))
    {
        $postbaccalaureate = $_GET['postbaccalaureate'];
    }
    if(isset($_GET['withdrawing']))
    {
        $withdrawing = $_GET['withdrawing'];
    }
    if(isset($_GET['veterans_benefits']))
    {
        $veterans_benefits = $_GET['veterans_benefits'];
    }
    if(isset($_GET['active']))
    {
        $active = $_GET['active'];
    }
    if(isset($_GET['non_stem_majors']))
    {
        $non_stem_majors = $_GET['non_stem_majors'];
    }

     //checks url for request variable
     if(isset($_GET['request']))
     {
         $request = $_GET['request'];
     }

     //calls function based on url request
    switch ($request) 
    {
        case 'update_student':
            $result = $student->update_student($user_id, $student_id, $first, $last, $cwu_id, $email, $phone, $address, $postbaccalaureate, $withdrawing, $veterans_benefits, $active);
            break;
        case 'add_student':
            $result = $student->add_student($user_id, $cwu_id, $email, $first, $last);
            echo json_encode($result);
            break;
        case 'get_student_info'://likely won't work because function calls on non-existing tables
            $result = $student->get_student_info($id, $cwu_id, $email);
            echo json_encode($result);
            break;
        case 'cwu_id_to_student_id':
            $result = $student->cwu_id_to_student_id($cwu_id);
            echo json_encode($result);
            break;
        case 'get_enrollments':
            $result = $student->get_enrollments($year);
            echo json_encode($result);
        case 'all_students':
            $result = $student->all_students($active_only = false);
            break;
        case 'get_bad_cwu_ids':
            $result = $student->get_bad_cwu_ids();
            echo json_encode($result);
            break;
        case'student_for_user':
            $result = $student->students_for_user($user_id);
            break;
        case 'active_students':
            $result =  $student->get_all_active_students();
            echo json_encode($result);
       
    }