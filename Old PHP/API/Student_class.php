 
    <?php
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        include_once '../config/Database.php';
        include_once '../model/Student_classes.php';

        $studentClass = new Student_classes();

        $request;

        //attributes of the tables
        $id;
        $student_id;
        $class_id;
        $term;

        //needed variables for some functions
        $user_id;
        $requirements_taken;

        //checks url for table variables
        if(isset($_GET['student_id']))
        {
            $student_id = $_GET['student_id'];
        }
        if(isset($_GET['class_id']))
        {
            $class_id = $_GET['class_id'];
        }
        if(isset($_GET['term']))
        {
            $term = $_GET['term'];
        }
        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
        }
        if(isset($_GET['user_id']))
        {
            $user_id = $_GET['user_id'];
        }
        if(isset($_GET['requirements_taken']))
        {
            $requirements_taken = $_GET['requirements_taken'];
        }

         //checks url for request variable
        if(isset($_GET['request']))
        {
            $request = $_GET['request'];
        }

        //calls function based on url request
        switch ($request) 
        {
            case 'get_plan':
                $result = $studentClass->get_plan($student_id, $start_year, $end_year);
                echo json_encode($result);
                break;
            case 'add_student_class':
                $studentClass->add_student_class($user_id, $student_id, $class_id, $term);
                break;
            case 'clear_plan':
                $studentClass->clear_plan($user_id, $student_id);
                break;
            case 'add_student_elective':
                $studentClass->add_student_elective($student_class_id, $program_id);
                break;
            case 'update_plan':
                $studentClass->update_plan($user_id, $student_id, $program_id, $classes);
                break;
            case 'update_requirements':
                $studentClass->update_requirements($student_id, $requirements_taken);
                break;
            default:
                echo 'request incorrrect';
                break;
        }