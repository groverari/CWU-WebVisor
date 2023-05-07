import axios from 'axios'

function get_all_active_students() {
  let res = axios
    .get(
      'http://localhost/CWU-WebVisor/Old%20PHP/API/Student.php?request=active_students'
    )
    .then((res) => {
      return res.data
    })
}

export default get_all_active_students
