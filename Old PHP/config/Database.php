<?php   
    
    
         $host = 'localhost';
         $db_name = 'advising';
         $username = 'root';
         $password = 'buttons93';
         $conn;
       
            $conn = null;

            try
            {
                $conn = new PDO('mysql:host=' . $host . ';dbname=' . $db_name, $username, $password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOException $e)
            {
                echo 'it\'s all fucked cuz ' . $e->getMessage();
            }

            $db = $conn;
        
    
        
    