 
    <?php
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
        
        include_once '../config/Database.php';
        include_once '../model/Student_classes.php';

        $studentClass = new Student_classes();

        $request

        //attributes of the tables
        $id;
        $student_id;
        $class_id;
        $term;

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

         //checks url for request variable
        if(isset($_GET['request']))
        {
            $request = $_GET['request'];
        }

        //calls function based on url request
        switch ($request) 
        {
            case 'add_student_class':
                $studentClass->add_student_class($student_id, $class_id, $term);
                break;
            case 'clear_plan':
                $studentClass->clear_plan($student_id);
                break;
            default:
                echo 'request incorrrect';
                break;
        }