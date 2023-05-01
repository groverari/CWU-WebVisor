<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Classes.php';

    $classes = new Classes();

    $request;

    //table attributes
    $id;
    $name;
    $title;
    $credits;
    $fall;
    $winter;
    $spring;
    $summer;
    $active;

    //needed vars for some function
    $user_id;
    $program_id;

    if(isset($_GET['id']))
     {
         $id = $_GET['id'];
     }
     if(isset($_GET['name']))
     {
         $name = $_GET['name'];
     }
     if(isset($_GET['title']))
     {
         $title = $_GET['title'];
     }
     if(isset($_GET['credits']))
     {
         $credits = $_GET['credits'];
     }
     if(isset($_GET['fall']))
     {
         $fall = $_GET['fall'];
     }
     if(isset($_GET['winter']))
     {
         $winter = $_GET['winter'];
     }
     if(isset($_GET['spring']))
     {
         $spring = $_GET['spring'];
     }
     if(isset($_GET['summer']))
     {
         $summer = $_GET['summer'];
     }
     if(isset($_GET['active']))
     {
         $active = $_GET['active'];
     }
     if(isset($_GET['user_id']))
     {
         $user_id = $_GET['user_id'];
     }
     if(isset($_GET['program_id']))
     {
         $program_id = $_GET['program_id'];
     }
    
     //checks url for request variable
     if(isset($_GET['request']))
     {
         $request = $_GET['request'];
     }

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
        default:
            echo 'request incorrrect';
            break;
    }
