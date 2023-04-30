<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Programs.php';

    $programs = new Programs();

    $request;

    //attributes of the tables
    $id;
    $major_id;
    $year;
    $credits;
    $elective_credits;
    $active;

    //needed attributes for some functions
    $catalog_year;
    $user_id;
    $template_id;

     //checks url for table variables
     if(isset($_GET['id']))
     {
         $id = $_GET['id'];
     }
     if(isset($_GET['major_id']))
     {
         $major_id = $_GET['major_id'];
     }
     if(isset($_GET['year']))
     {
         $year = $_GET['year'];
     }
     if(isset($_GET['credits']))
     {
         $credits = $_GET['credits'];
     }
     if(isset($_GET['elective_credits']))
     {
         $elective_credits = $_GET['elective_credits'];
     }
     if(isset($_GET['active']))
     {
         $active = $_GET['active'];
     }
     if(isset($_GET['catalog_year']))
     {
         $catalog_year = $_GET['catalog_year'];
     }
     if(isset($_GET['user_id']))
     {
         $user_id = $_GET['user_id'];
     }
     if(isset($_GET['template_id']))
     {
         $template_id = $_GET['template_id'];
     }
     
     //checks url for request variable
     if(isset($_GET['request']))
     {
         $request = $_GET['request'];
     }

     //calls function based on url request
    switch ($request) 
    {
        case 'get_program_id':
            $result = $programs->get_program_id($major_id, $catalog_year);
            echo json_encode($result);
            break;
        case 'all_programs':
            $result = $programs->all_programs($user_id);
            echo json_encode($result);
            break;
        case 'get_program_info':
            $result = $programs->get_program_info($id);
            echo json_encode($result);
            break;
        case 'get_program_roster':
            $result = $programs->get_program_roster($id);
            echo json_encode(get_program_roster($id));
            break;
        case 'add_program':
            $programs->add_program($user_id, $major_id, $year, $template_id);
            break;
        case 'update_programs':
            $programs->update_program($user_id, $id, $major_id, $year, $credits, $elective_credits, $active);
        default:
            echo 'request incorrrect';
            break;
    }