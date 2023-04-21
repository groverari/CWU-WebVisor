<?php
    class Class
    {
        private $conn;
        private $table = 'classes';

        public $id;
        public $name;
        public $title;
        //... so on

        function __constructor($db)
        {
            this->$conn = $db;
        }
        //read--reads every piece of class data and outputs as JSON

        //update--which updates part of a class row or piece of data

        //create--which adds a new class

        //readSingle--reads one class

        //some various other methods
    }