<?php
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: POST');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
   
   include_once '../config/Database.php';
   include_once '../model/Program_Classes.php';
   
   $json = file_get_contents('php://input');
   $data = json_decode($json, true);

   //validate api key before moving forward

   $request = $data['request'];

   $program_classes = new Program_Classes();

    //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

    //calls function based on url request
    switch ($request) 
    {
    case 'get_required_classes':
        $result = $program_classes->get_required_classes($data['program_id'], $data['required']);
        echo json_encode($result);
        break;
    case 'update_program_classes':
        // $program_classes->update_program_classes($user_id, $program_id, $core_ids, $required_ids, $minimum_grade, $sequence_no, $YES, $NO);
        // break;
    default:
        echo 'request incorrrect';
        break;
    }