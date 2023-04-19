<?php
    class Users
    {
        // DB stuff
        private $conn;
        private $table ='users';

        //constructor
        public function __construct($db)
        {
            $this->conn = $db;
        }

        function get_user_info($login='', $password='', $database='', $setcookies = false){
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

        //Updates user program
        function update_user($user_id, $password, $name, $program_id){
            global $db;
            $query = "UPDATE users 
                        SET name = :name , 
                            program_id = :programid
                        WHERE user_id = :user_id";
            $data_array = [":program_id" => $program_id, ":user_id"=> $user_id];
            
            if( !add_db($query, $data_array)){
                $error = "Could not update user info";
                include ('../errors/error.php');
            }    
        }

        //Get All Users in Database
        function all_users()
        {
            //create query
            $query = '
            SELECT
                *
            FROM
                ' . $this->table . '
            ORDER BY
                name ASC
            ;';

            //prepare stmt
            $stmt = $this->conn->prepare($query);

            //execute query
            $stmt->execute();

            return $stmt;
        }
    }