<?php
    class Students
    {
        function update_student($user_id, $student_id, $first, $last, $cwu_id, $email, $phone, $address, $postbaccalaureate, $withdrawing, $veterans_benefits, $active)
        {
            $query = "
            UPDATE
                Students
            SET
                first='$first',
                last='$last',
                cwu_id=$cwu_id,
                email='$email',
                phone='$phone',
                address='$address',
                postbaccalaureate='$postbaccalaureate',
                withdrawing='$withdrawing',
                veterans_benefits='$veterans_benefits',
                active='$active'
            WHERE
                id=$student_id
                ;";

            $dataArr = [':first'=>$first, ':last'=>$last, ':cwu_id'=>$cwu_id, ':email'=>$email, ':phone'=>$phone, ':address'=>$address, ':postbaccalaureate'=>$postbaccalaureate, ':withdrawing'=>$withdrawing, ':veterans_benefits'=>$veterans_benefits, ':active'=>$active, ':student_id'=>$student_id];
            $rowAffected = add_db_row($query, $dataArr);
            if($rowAffected > 0)
            {
                $journ = new Journal()
                $note = "Updated <student:$student_id>.";
                $journ->record_update_student($user_id, $student_id, $note);
            }
        }

        function add_student($user_id, $cwu_id, $email, $first='', $last='')
	    {
            if ($cwu_id != 0)
            {
                $query_string = "
                SELECT
                    id
                FROM
                    Students
                WHERE
                    cwu_id=$cwu_id
                ;";
            }
    }