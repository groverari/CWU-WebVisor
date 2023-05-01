<?php
    //headers
    
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Majors.php';

    $majors = new Majors();

    //$method = $_SERVER['REQUEST_METHOD'];
    $request;

    //attributes of the tables
    $name;
    $active;
    $id;

    //checks url for table variables
    if(isset($_GET['name']))
    {
        $name = $_GET['name'];
    }
    if(isset($_GET['active']))
    {
        $active = $_GET['active'];
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    
    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }
    
    //calls function based on url request
    switch ($request) 
    {
        case 'read':
            $result = $majors->read();
            echo json_encode($result);
            break;
        case 'readSingle':
            $result = $majors->readSingle($id);
            echo json_encode($result);
            break;
        case 'create':
            $majors->create($name, $active);
            break;
        case 'update':
            $majors->update($id, $name, $active);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
    