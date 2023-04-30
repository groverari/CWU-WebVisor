<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Prerequisites.php';

    $prerequisites = new Prerequisites;

    $request;

    //table properties
    $id;
    $class_id;
    $prerequisite_id;
    $minimum_grade;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['class_id']))
    {
        $class_id = $_GET['class_id'];
    }
    if(isset($_GET['prerequisite_id']))
    {
        $prerequisite_id = $_GET['prerequisite_id'];
    }
    if(isset($_GET['minimum_grade']))
    {
        $minimum_grade = $_GET['minimum_grade'];
    }


        //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    switch($request){

        case 'updatePrerequisites':
            $result = $prerequisites->updatePrerequisites($class_id, $prereq_ids, $required_grades);
            break;

        case 'getPrerequisites':
            $restul = $prerequisites->getPrerequisites($class_id);
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }