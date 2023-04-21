<?php
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../config/Database.php';
    include_once '../model/Users.php';

    $database = new Database();
    $db = $database->connect();

    $users = new Users($db);

    $method = $_SERVER['REQUEST_METHOD'];
    $parts = explode('/', $_SERVER['PATH_INFO']);
    if($method == 'GET')
    {
        if($parts[2] == 'all')
        {
            $result = $users->read();
            $data = $result->fetchAll();
            echo json_encode($data);
        }
    }
    

