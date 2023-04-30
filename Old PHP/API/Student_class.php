 
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

        //checks url for table variables
        if(isset($_GET['id']))
        {
            $id = $_GET['id'];
        }
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
       
        

         //checks url for request variable
        if(isset($_GET['request']))
        {
            $request = $_GET['request'];
        }

        //calls function based on url request
        switch ($request) 
        {
            case 'add_student_class':
                $result = $studentClass->add_student_class($user_id, $student_id, $class_id, $term);
                break;
            case 'clear_plan':
                $result = $studentClass->clear_plan($student_id);
                break;

            case 'get_lost_students':
                $result = get_lost_students();
                break;
            default:
                echo 'request incorrrect';
                break;
        }