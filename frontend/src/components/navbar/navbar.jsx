import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="link-contianer">
        <Link path="/students">
          <button>Students</button>
        </Link>
        <Link path="./classes">
          <button>Classes</button>
        </Link>
        <Link path="./programs">
          <button>Programs</button>
        </Link>
        <Link path="./settings">
          <button>Programs</button>
        </Link>
      </div>

      <Outlet />
    </>
  );
};
export default NavBar;
