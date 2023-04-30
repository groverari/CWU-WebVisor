<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Templates.php';

    $template = new Templates();


    $request();

    //properties of table
    $id;
    $program_id;
    $name;

    //checks url for table variable
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
    }
    if(isset($_GET['name']))
    {
        $name = $_GET['name'];
    }

    
    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    switch($request){
        case 'getTemplates':
            $result = $template->getTemplates($program_id);
            break;
        case 'getNamedTemplates':
            $result = $template->getNamedTemplates($program_id);
            break;
        case 'createTemplate':
            $result = $template ->createTemplate($user_id, $program_id, $name, $mimic_id);
            break;
        case 'getTemplateInfo':
            $result = $template->getTemplateInfo($template_id);
            break;
        default:
            echo 'request incorrrect';
             break;

    }

