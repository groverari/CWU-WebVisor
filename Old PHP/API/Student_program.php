<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    
    include_once '../config/Database.php';
    include_once '../model/Student_Programs.php';

    $studentProgram = new Student_Programs();

    $request;

    //attributes of the tables
    $id;
    $student_id;
    $program_id;
    $user_id;

    //needed parameters for some methods
    $advisor_id;
    $remove_programs;
    $add_program_id;
    $add_advisor_id;
    $non_stem_majors;

    //checks url for table variables
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
    }
    if(isset($_GET['student_id']))
    {
        $student_id = $_GET['student_id'];
    }
    if(isset($_GET['program_id']))
    {
        $program_id = $_GET['program_id'];
    }
    if(isset($_GET['user_id']))
    {
        $user_id = $_GET['user_id'];
    }
    if(isset($_GET['advisor_id']))
    {
        $advisor_id = $_GET['advisor_id'];
    }
    if(isset($_GET['remove_programs']))
    {
        $remove_programs = $_GET['remove_programs'];
    }
    if(isset($_GET['add_program_id']))
    {
        $add_program_id = $_GET['add_program_id'];
    }
    if(isset($_GET['add_advisor_id']))
    {
        $add_advisor_id = $_GET['add_advisor_id'];
    }
    if(isset($_GET['non_stem_majors']))
    {
        $non_stem_majors = $_GET['non_stem_majors'];
    }

     //checks url for request variable
    if(isset($_GET['request']))
    {
        $request = $_GET['request'];
    }

     //calls function based on url request
    switch ($request) 
    {
        case 'programs_with_student':
            $result = $studentProgram->programs_with_student($student_id);
            echo json_encode($result);
            break;
        case 'user_can_update_student':
            $result = $studentProgram->user_can_update_student($user_id, $student_id);
            echo json_encode($result);
            break;
        case 'student_in_program':
            $result = $studentProgram->student_in_program($student_id, $program_id);
            echo json_encode($result);
            break;
        case 'update_student_advisor':
            $result = $studentProgram->update_student_advisor($user_id, $student_id, $program_id, $advisor_id);
            break;
        case 'get_student_program_advisor':
            $result = $studentProgram->get_student_program_advisor($student_id, $program_id);
            echo json_encode($result);
            break;
        case 'update_student_programs':
            $result = $studentProgram->update_student_programs($user_id, $student_id, $remove_programs, $add_program_id, $add_advisor_id, $non_stem_majors);
        default:
            echo 'request incorrrect';
            break;
    }