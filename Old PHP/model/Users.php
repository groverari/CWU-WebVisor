<?php
    include_once 'PDO-methods.php';
    include_once 'Journals.php';

   
    function update_user($user_id, $password, $name, $program_id)
        {
            $query_string = "
                UPDATE
                    users
                SET
                    name=:name,
                    program_id=:program_id
                WHERE
                    id=:user_id
                ;";
            $dataArr = [':name'=>$name, ':program_id'=>$program_id, ':user_id'=>$user_id];
            $query_result = add_db($query_string, $dataArr);
            
            if ($password != '')
            {
                $query_string = "
                    UPDATE
                        users
                    SET
                        password=:password
                    WHERE
                        id=:user_id
                ;";
                $dataArr =[':password'=>$password, ':user_id'=>$user_id];
                $query_result = add_db($query_string, $dataArr);
            }
        }

        function isUser($login, $password)
        {
            //create query
            $query = '
            SELECT
                superuser
            FROM
                users
            WHERE
                login=:login;
                password=:password;
            ORDER BY
                name ASC
            ;';
            $dataArr = [':login'=>$login, ':password'=>$password];
            $result = get_from_db($query, $dataArr);
            return $result;
        }
        //Get All Users in Database
        function read()
        {
            //create query
            $query = '
            SELECT
                *
            FROM
                users
            ORDER BY
                name ASC
            ;';
            $result = get_from_db( $query);

            return $result;
        }

        function find_user($cwu_id, $email, $first, $last)
        {
            $id = 0;
            $dataArr = [];
            $query = "";
            if ($cwu_id != '')
            {
                $query = "
                SELECT
                    id
                FROM
                    students
                WHERE
                    cwu_id=:cwu_id;";
                $dataArr = [':cwu_id'=>$cwu_id];
            }
            else
            {
                $query = "
                SELECT
                    id
                FROM
                    students
                WHERE
                    email=:email;";
                $dataArr = [':email'=>$email];
            }
            $resultRow = get_from_db_rows($query, $dataArr);
            
            if ($resultRow == 0)
            {
                if ($cwu_id != 0 || $email != '')
                {
                    if ($cwu_id == '')
                    {
                        $cwu_id = 'NULL';
                    }
                    $query = "
                    INSERT INTO
                        students(cwu_id, email, first, last)
                    VALUES
                        (:cwu_id, :email, :first, :last);";
                    $dataArr = [':cwu_id'=>$cwu_id,':email'=>$email, ':first'=>$first, ':last'=>$last];
                    $result = add_db_rows($query, $dataArr);
                    $id = $result;
                }
                else
                {
                    add_message("Cannot add new user without both a CWU ID and a CWU email address.");
                }
            }
            else
            {
                $row = get_from_db($query, $dataArr);
                $id = $row['id'];
            }
            return $id;
        }

        function get_user_info($login='', $password='', $database='', $setcookies = false)
        {
            global $db;
            //TODO hash password here to compare it to the db password
            if ($login == '' && $password == '')
                {
                    $login = $_COOKIE['webvisor_login'];
                    $password = $_COOKIE['webvisor_password'];
                }
            $query = "SELECT * FROM users
                        WHERE login = :login AND
                        password == :password";
            $data_array = [':login'=> $login, ':password'=>$password ];
            $user = get_from_db($query, $data_array);
            

            if(!$user){
                $error = "Could not verify user info please check username and password again";
                include("../errors/error.php");
                return false;
            }
            if ($setcookies)
            {
                $two_weeks = time()+60*60*24*14;
                setcookie('webvisor_login', $login, $two_weeks);
                setcookie('webvisor_password', $password, $two_weeks);
            }
            return $user;
        }
        
        function is_superuser($user_info)
        {
            global $YES;
            return ($user_info['superuser'] == $YES);
        }
    

   

    //     //Updates user program
    //     function update_user($user_id, $password, $name, $program_id){
    //         global $db;
    //         $query = "UPDATE users 
    //                     SET name = :name , 
    //                         program_id = :programid
    //                     WHERE user_id = :user_id";
    //         $data_array = [":program_id" => $program_id, ":user_id"=> $user_id];
            
    //         if( !add_db($query, $data_array)){
    //             $error = "Could not update user info";
    //             include ('../errors/error.php');
    //         }    
    //     }