<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../config/Database.php';
    include_once '../model/Program_Classes.php';

    $program_classes = new Program_Classes();

    $request;

    //table attributes
    $id;
    $program_id;
    $class_id;
    $minimum_grade;
    $sequence_no;
    $template_qtr;
    $template_year;
    $required;

    //attributes for some functions
    $user_id;
    $core_ids;
    $required_ids;
    $YES;
    $NO;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
    }
    if(isset($_GET['class_id']))
    {
        $class_id = $_GET['class_id'];
    }
    if(isset($_GET['minimum_grade']))
    {
        $minimum_grade = $_GET['minimum_grade'];
    }
    if(isset($_GET['sequence_no']))
    {
        $sequence_no = $_GET['sequence_no'];
    }
    if(isset($_GET['template_qtr']))
    {
        $template_qtr = $_GET['template_qtr'];
    }
    if(isset($_GET['template_year']))
    {
        $template_year = $_GET['template_year'];
    }
    if(isset($_GET['required']))
    {
        $required = $_GET['required'];
        if($required == 'YES')
        {
            $YES = 'YES';
        }
        else if($required == 'NO')
        {
            $NO = 'NO';
        }
    }

    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

     //calls function based on url request
     switch ($request) 
     {
        case 'get_required_classes':
            $result = $program_classes->get_required_classes($program_id, $required);
            echo json_encode($result);
            break;
        case 'update_program_classes':
            $program_classes->update_program_classes($user_id, $program_id, $core_ids, $required_ids, $minimum_grade, $sequence_no, $YES, $NO);
            break;
        default:
            echo 'request incorrrect';
            break;
     }