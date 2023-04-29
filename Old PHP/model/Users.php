<?php
    include_once 'PDO-methods.php';
    class Users
    {
        // DB stuff
        private $conn;
        private $table ='users';


        // 

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
            $dataArr;
            $query;
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
            $result = get_from_db($query, $data_array);
            
            if ($result->rowCount() == 0)
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
                        ($cwu_id, '$email', '$first', '$last');";
                    $result = my_query($query_string);
                    $id = $row['id'];
                }
                else
                {
                    add_message("Cannot add new user without both a CWU ID and a CWU email address.");
                }
            }
            else
            {
                $row = get_from_db($result);
                $id = $row['id'];
            }
            return $id;
        }

    }

    // function get_user_info($login='', $password='', $database='', $setcookies = false){
    //         global $db;
    //         //TODO hash password here to compare it to the db password
    //         if ($login == '' && $password == '')
    //             {
    //                 $login = $_COOKIE['webvisor_login'];
    //                 $password = $_COOKIE['webvisor_password'];
    //             }
    //         $query = "SELECT * FROM users
    //                     WHERE login = :login AND
    //                     password == :password";
    //         $data_array = [':login'=> $login, ':password'=>$password ];
    //         $user = get_from_db($query, $data_array);
            

    //         if(!$user){
    //             $error = "Could not verify user info please check username and password again";
    //             include("../errors/error.php");
    //             return false;
    //         }
    //         if ($setcookies)
    //         {
    //             $two_weeks = time()+60*60*24*14;
    //             setcookie('webvisor_login', $login, $two_weeks);
    //             setcookie('webvisor_password', $password, $two_weeks);
    //         }
    //             return $user;
    //     }

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