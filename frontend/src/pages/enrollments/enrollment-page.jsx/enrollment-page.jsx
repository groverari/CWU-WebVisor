import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassTable = () => {
  const [classData, setClassData] = useState([]);

  let api_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .post(api_url + "Class.php", { request: "all_active_classes" })
      .then((res) => {
        setClassData(res.data);
        //setSearchClasses(res.data) ------>set searchClasses to all classes initially
      });
  }, []);

  useEffect(() => {
     console.log(classData)
  }, [classData]);


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Fall</th>
            <th>Winter</th>
            <th>Spring</th>
            <th>Summer</th>
          </tr>
        </thead>
        <tbody>
          {classData.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.name}</td>
              <td>{classItem.fall}</td>
              <td>{classItem.winter}</td>
              <td>{classItem.spring}</td>
              <td>{classItem.summer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassTable;