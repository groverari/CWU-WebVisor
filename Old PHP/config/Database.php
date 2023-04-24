<?php   
    class Database
    {
        private $host = 'webvisor.cofhp51rtxvh.us-east-2.rds.amazonaws.com';
        private $db_name = 'advising';
        private $username = 'admin';
        private $password = 'webvisor';
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
        
    