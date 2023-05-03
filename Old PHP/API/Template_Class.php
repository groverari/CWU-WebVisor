<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Template_Classes.php';

    $template_class = new Template_Classes();

    $request;

    //properties of table

    $id;
    $template_id;
    $class_id;
    $quarter;
    $year;

    //checks url for table variable;
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['template_id']))
    {
        $template_id = $_GET['template_id'];
    }
    if(isset($_GET['class_id']))
    {
        $class_id = $_GET['class_id'];
    }
    if(isset($_GET['quarter']))
    {
        $quarter = $_GET['quarter'];
    }
    if(isset($_GET['year']))
    {
        $year = $_GET['year'];
    }

    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    //calls function based on url request
    switch($request){

        case 'get_template_classes':
            $result = $template_class->get_template_classes($template_id);
            echo json_encode($result);
            break;
        case 'update_template':
            $result = $template_class->update_template($template_id, $name, $template);
            break;
        case 'fill_template':
            $result = $template_class->fill_template($user_id, $student_id, $template_id, $template_year);
            break;
        default:
            echo 'request incorrrect';
            break;
    }



    