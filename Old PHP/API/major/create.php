<?php 
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../model/Majors.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate blog post object
    $majors = new Majors($db);

    $majors->name = "History";
    $majors->active = "Yes";

    // Create post
    if($majors->create()) {
        echo json_encode(
        array('message' => 'Major Created')
        );
    } else {
        echo json_encode(
        array('message' => 'Major Not Created')
        );
    }