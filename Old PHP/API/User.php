<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Users.php';

    $users = new Users();

    $request;

    //attribute of table
    $id;
    $login;
    $password;
    $name;
    $program_id;
    $superuser;
    $last;
    $first;
    
    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['login']))
    {
        $login = $_GET['login'];
    }
    if(isset($_GET['password']))
    {
        $password = $_GET['password'];
    }
    if(isset($_GET['name']))
    {
        $name = $_GET['name'];
    }
    if(isset($_GET['program_info']))
    {
        $program_info = $_GET['program_info'];
    }
    if(isset($_GET['superuser']))
    {
        $superuser = $_GET['superuser'];
    }
    if(isset($_GET['last']))
    {
        $last = $_GET['last'];
    } 
    if(isset($_GET['first']))
    {
        $first = $_GET['first'];
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
            $result = $users->read();
            echo json_encode($result);
            break;
        default:
            echo 'request incorrrect';
            break;
    }
