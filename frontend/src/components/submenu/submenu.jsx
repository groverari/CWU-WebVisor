import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./submenu.styles.scss";

// SubMenu component
const SubMenu = (props) => {
  // Get the current location using the useLocation hook
  const location = useLocation();
  // Extract baseurl, links, and title from props
  const baseurl = props.baseurl;
  const { links, title } = props;
  // State for managing the active link
  const [activeLink, setActiveLink] = useState(sessionStorage.getItem("link"));
  // Function to handle link click and update the active link state
  const handleLinkClick = (link) => {
    sessionStorage.setItem("link", activeLink);
    setActiveLink(link);
  };

  // Styles for clicked and unclicked links
  const clickedStyle = {
    backgroundColor: "#745cab",
  };

  const unclickedStyle = {
    backgroundColor: "#b092ff",
    color: "black",
  };
  return (
    // Render the submenu container
    <div className="submenu-container">
      <h3>{title}</h3>
      {links.map((link) => {
        return (
          <div className="submenu-link-container" key={link.key}>
            <Link
              // Set the link's className based on the current location
              className={
                location.pathname.includes(link.path)
                  ? "submenu-link-clicked"
                  : "submenu-link-unclicked"
              }
              // Set the link's destination using baseurl and link.path
              to={baseurl + link.path}
              onClick={() => handleLinkClick(link.name)}
            >
              {link.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SubMenu;
