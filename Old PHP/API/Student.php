<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Majors.php';

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
        case 'student_in_program':
            $result = $student->update_student($user_id, $student_id, $first, $last, $cwu_id, $email, $phone, $address, $postbaccalaureate, $withdrawing, $veterans_benefits, $active);
            break;
        default:
            echo 'request incorrrect';
            break;
    }