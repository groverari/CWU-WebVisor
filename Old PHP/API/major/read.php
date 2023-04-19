<?php 
    //headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../model/Majors.php';

    $database = new Database();
    $db = $database->connect();

    $majors = new Majors($db);

    $result = $majors->read();
    $data = $result->fetchAll();

    echo json_encode($data);
