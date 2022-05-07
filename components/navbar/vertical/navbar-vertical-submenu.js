import { Link } from "react-router-dom";

const Submenu = ({ submenus }) => {
  // depthLevel = depthLevel + 1;depthLevel > 0 ?: ""
  const dropdownClass = "pcoded-submenu";
  return (
    <>
      <ul className={`${dropdownClass}`}>
        {submenus.map((submenu, index) => (
          <li id={`Sub${index}`} key={`${index}`}>
            <Link to={submenu.path} title={submenu.title}>
              
              {submenu.title}
            </Link>{" "}
          
          </li>
        ))}
      </ul>
    </>
  );
};

export default Submenu;
