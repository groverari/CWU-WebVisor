<?php 
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Users.php';

    $database = new Database();
    $db = $database->connect();

    $users = new Users($db);

    $result = $users->read();
    $data = $result->fetchAll();

    echo json_encode($data);