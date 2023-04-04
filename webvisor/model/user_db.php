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

//Updates user program
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

//Get All Users in Database
function all_users(){
    global $db;
    $query = "SELECT *
                From users
                ORDER BY name ASC";
    $statement = $db->prepare($query);
    $statement->execute();
    $users = $statement->fetchAll();

    return $users;
}

//Get journal entry associated with a student
function get_journal( $user_id, $student_id, $class_id, $program_id, $major_id){
    global $db;
    $query = "
    SELECT
        Journal.date,
        Users.name AS user_name,
        CONCAT(Students.last, \", \", Students.first) AS student_name,
        Classes.name AS class_name,
        Programs.year AS program_name,
        Majors.name AS major_name,
        note
    FROM 
        journal as j
        LEFT JOIN users ON journal.user_id=Users.id
        LEFT JOIN students ON journal.student_id=Students.id
        LEFT JOIN classes ON journal.class_id=Classes.id
        LEFT JOIN programs ON journal.program_id=Programs.id
        LEFT JOIN majors ON journal.major_id=Majors.id
    ORDER BY
        date DESC
    WHERE 
        j.user_id = 
    LIMIT
        100;
    ";

    $statement = $db->prepare($query);
    $statement

}