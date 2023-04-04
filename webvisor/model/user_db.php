<?php
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
    $statement = $db->prepare($query);
    $statement->bindValue(':login', $login);
    $statement-> bindValue(':password', $password);
    $statement ->execute();
    $user = $statement->fetch();
    $statement->closeCursor();

    if(!$user){
        $error = "Could not verify user info please check username and password again";
        include("../errors/error.php");
        return false;
    }
    if ($setcookies)
    {
        $two_weeks = time()+60*60*24*365;
        setcookie('webvisor_login', $login, $two_weeks);
        setcookie('webvisor_password', $password, $two_weeks);
    }
        return $user;
}

function update_user($user_id, $password, $name, $program_id){
    global $db;
    $query = "UPDATE users 
                SET name = :name , 
                    program_id = :programid
                WHERE user_id = :user_id";
    $statement = $db->prepare($query);
    $statement-> bindValue(':name', $name);
    $statement-> bindValue(':program_id', $program_id);
    $statement-> bindValue(':user_id', $user_id);
    $success = $statement ->execute();
    $statement->closeCursor();
}