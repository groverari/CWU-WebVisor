//THIS FILE IS NOT USED
<html>

<body>

    <?php
	include_once('_sql.php');
	include_once('_html.php');
		
	get_user_info();
	
	ini_set("auto_detect_line_endings", "1");
	$lines = file("data.csv");
//	array_shift($lines);
	foreach ($lines as $line)
	{
		$data = explode(',', $line);
		if (trim($data[0]) != '')
		{
			$cwu_id = trim($data[0]);
			$student_name = trim($data[1]);
		}
		if (trim($data[2]) != '')
		{
			$year = trim($data[2]);
		}
		if (trim($data[3]) != '')
		{
			$term_text = trim($data[3]);
		}
		
		if ($term_text == 'Fall')
		{
			$term = $year."1";
		}
		else if ($term_text == 'Winter')
		{
			$term = ($year-1)."2";
		}
		else if ($term_text == 'Spring')
		{
			$term = ($year-1)."3";
		}
		else if ($term_text == 'Summer')
		{
			$term = ($year-1)."4";
		}		
		
		$class_name = trim($data[4]);
		$elective = $NO;
		if (trim($data[5]) == $YES)
		{
			$elective = $YES;
		}

		// this will need to be reworked to include email and first/last
		$email = '';
		$first = '';
		$last = '';
		$student_data = add_student($cwu_id, $email, $first, $last);
		$class_data = find_class(0, $class_name);
		$student_id = $student_data['id'];
		$class_id = $class_data['id'];
		
		if ($student_id != '' && $class_id != '')
		{
			add_student_class($student_id, $class_id, $term, $elective);
		}
		
	}	
?>

    <?php echo(messages()); ?>

</body>

</html>