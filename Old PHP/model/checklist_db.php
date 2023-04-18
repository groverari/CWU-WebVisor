<?php

function get_checklist(){
    $query= "SELECT id, name, sequence
            FROM Checklists";
    $data = get_from_db($query);
    return $data;
}