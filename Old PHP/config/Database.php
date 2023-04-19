<?php   
    class Database
    {
        private $host = 'localhost';
        private $db_name = 'advising';
        private $username = 'root';
        private $password = 'buttons93';//should be empty for you
        private $conn;
       
        public function connect()
        {
            $this->conn = null;

            try
            {
                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            catch(PDOException $e)
            {
                echo 'it\'s all fucked cuz ' . $e->getMessage();
            }

            return $this->conn;
        }
    }
        
    