<?php
    //headers

    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Majors.php';

    $database = new Database();
    $db = $database->connect();

    $majors = new Majors($db);

    //$method = $_SERVER['REQUEST_METHOD'];
    $request;

    //attributes of the tables
    $name;
    $active;
    $id;


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

    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    if($request == 'read')
    {
        $result = $majors->read();
        $data = $result->fetchAll();
        echo json_encode($data);
    }
    else if($request == 'readSingle')
    {
        $result = $majors->readSingle($id);
        $data = $result->fetchAll();
        echo json_encode($data);
    }
    else if($request == "create")
    {
        $majors->create($name, $active);
    }
    else if($request == "update")
    {
        $majors->update($id, $name, $active);
    }
    

