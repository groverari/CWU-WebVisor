<?php
    include_once 'Journals.php';
    include_once 'PDO-methods.php';

      // function points_to_grade($points)
      // {
      //    $temp= all_grades();
      //    return $temp[$points];
      // }

      // function all_grades()
      // {
      //    return array(
      //       40 => 'A',
      //       37 => 'A-',
      //       33 => 'B+',
      //       30 => 'B',
      //       27 => 'B-',
      //       23 => 'C+',
      //       20 => 'C',
      //       17 => 'C-',
      //       13 => 'D+',
      //       10 => 'D',
      //       7 => 'D-',
      //       0 => 'F'
      //    );
      // }
      
      function get_class_info($id, $program_id=0)
      {
         $query_string = "
         SELECT
            id, name, title, credits, fall, winter, spring, summer, active
         FROM
            classes
         WHERE
            classes.id=:id
            ;";

         if ($program_id != 0)
         {
            $query_string = "
            SELECT
               classes.*,
               program_classes.minimum_grade
            FROM
               classes
               LEFT JOIN program_classes ON program_classes.class_id=classes.id
            WHERE
               classes.id=:id
            ;";
         }
         $dataArr = [':id'=>$id];
         $query_result = get_from_db($query_string, $dataArr);
         return $query_result;
      }

      function update_class($user_id, $class_id, $name, $title, $credits, $fall, $winter, $spring, $summer, $active)
      {
         $query_string = "
         UPDATE
            classes
         SET
            name=:name,
            title=:title,
            credits=:credits,
            fall=:fall,
            winter=:winter,
            spring=:spring,
            summer=:summer,
            active=:active
         WHERE
            id=:class_id
            ;";
         $dataArr =[':class_id'=>$class_id, ':name'=>$name, ':title'=>$title, ':credits'=>$credits, ':fall'=>$fall, ':winter'=>$winter, ':spring'=>$spring, ':summer'=>$summer, ':active'=>$active];
         $query_result_row = add_db_rows($query_string, $dataArr);
         
         if ($query_result_row > 0)
         {
            $journ = new Journals();
            $note = "Updated <class:$class_id>.";
            $journ->record_update_class($user_id, $class_id, $note);
         }

      }

      // creates the class and returns the class id of the new class
      function add_class_class_table($user_id, $name, $credits, $title='', $fall='$NO', $winter='$NO', $spring='$NO', $summer='$NO')
      {
         $query_string = "
         INSERT INTO classes
            (name, title, credits, fall, winter, spring, summer)
         VALUES
            (:name, :title, :credits, :fall, :winter, :spring, :summer)
         ;";
         $dataArr =[':name'=>$name, ':title'=>$title, ':credits'=>$credits, ':fall'=>$fall, ':winter'=>$winter, ':spring'=>$spring, ':summer'=>$summer];
         $result = add_db($query_string, $dataArr);
         
         $class_id = $result['id'];
         
         if ($class_id > 0)
         {
            $journ = new Journals();
            $note = "<class:$class_id> added.";
            $journ->record_update_class($user_id, $class_id, $note);
         }
         
         return $class_id;
      }

      function all_classes($program_id = 0)
      {
         $all_classes = array();
         
         if ($program_id != 0)
         {
            // $program_id != 0
            $query_string = "
            SELECT
               classes.id,
               CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name,
               program_classes.minimum_grade,
               COALESCE(program_classes.sequence_no, 1000) AS seqno
            FROM
               classes LEFT JOIN program_classes ON classes.id=program_classes.class_id
            WHERE
               program_classes.program_id=:program_id
            ORDER BY
               active, seqno, name ASC";
            $dataArr = [':program_id'=>$program_id];
            $query_result = get_from_db($query_string, $dataArr);
            foreach ($query_result as $row)
            {
               $id = $row['id'];
               $name = $row['name'];
               if (isset($row['minimum_grade']) && $row['minimum_grade'] > 7)
               {
                  $name .= " @ ".points_to_grade($row['minimum_grade']);
               }
               $all_classes[$id] = $name;
            }
            
            $query_string = "
            SELECT
               classes.id,
               CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name
            FROM
               classes
            ORDER BY
               active,
               name ASC
               ;";
   
            $query_result = get_from_db($query_string);
            foreach ($query_result as $row)
            {
               $id = $row['id'];
               if (!array_key_exists($id, $all_classes))
               {
                  $name = $row['name'];
                  if (isset($row['minimum_grade']) && $row['minimum_grade'] > 7)
                  {
                     $name .= " @ ".points_to_grade($row['minimum_grade']);
                  }
                  $all_classes[$id] = $name;
               }
            }
         }
         else
         {
            // $program_id = 0
            $query_string = "
            SELECT
               classes.id,
               CONCAT(classes.name, ' (', classes.credits, ' cr)') AS name
            FROM
               classes
            ORDER BY
               active,
               name ASC
               ;";
   
            $query_result = get_from_db($query_string);
            foreach ($query_result as $row)
            {
               $id = $row['id'];
               $name = $row['name'];
               if (isset($row['minimum_grade']) && $row['minimum_grade'] > 7)
               {
                  $name .= " @ ".points_to_grade($row['minimum_grade']);
               }
               $all_classes[$id] = $name;
            }
         }
         
         return $all_classes;
      }

      function get_all_classes(){
         $query = "SELECT * FROM classes WHERE active = 'Yes'" ;
         return get_from_db($query);
      }