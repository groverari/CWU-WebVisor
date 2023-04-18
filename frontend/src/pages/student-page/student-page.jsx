import { Route, Outlet } from "react-router-dom";

const StudentPage = () => {
  return (
    <>
      <div className="submenu">
        <Link className="Search Link">
          <button className="sub-menu-button">Student Search</button>
        </Link>
        <Link className="Search Link">
          <button className="sub-menu-button">Add Student</button>
        </Link>
        <Link className="Search Link">
          <button className="sub-menu-button">Lost Students</button>
        </Link>
      </div>
      <Outlet />
    </>
  );
};
export default StudentPage;
