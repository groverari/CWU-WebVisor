<?php 

$dsn = 'mysql:host=localhost;dbname=webvisor';

$username = 'root';
$password = "";

//$db is a the connection to the database object
try{
    $db = new PDO($dsn, $username, $password);
}
catch(PDOException $e){
    $error_message = $e -> getMessage();
    echo "ERROR";
}


$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'];

if($method == 'GET' && $path == '/users'){
    global $db;
    $query = "SELECT * FROM Users";
    $stmt = $db->prepare($query); 
    $stmt -> execute();
    $data = $stmt -> fetchAll();


  
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    echo   json_encode($data);
}
if($method == 'GET' && $path == '/majors'){
    global $db;
    $query = "SELECT * FROM majors";
    $statement = $db -> prepare($query);
    $statement-> execute();
    $data = $statement -> fetchAll();
    echo json_encode($data);
}