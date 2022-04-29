import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  NavLink,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { auth } from "../firebase";
import { logout, selectUser } from "../redux/authSlice";

function Menu({ handleMouseDown, menuVisibility }) {
  const [active, setActive] = useState(null);

  let className = "menu";
  if (menuVisibility) {
    className += " show";
  } else {
    className += " hide";
  }

  const user = getAuth().currentUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAuthentication = () => {
    if (user) {
      dispatch(logout());
      signOut(auth).then(() => {
        navigate("/intro");
      });
    } else {
      navigate("/intro");
    }
    handleMouseDown();
  };

  const id = useParams();

  useEffect(() => {
    setActive(id);
  }, []);
  return (
    <div className={className} id="flyoutMenu">
      <div className="menuheader">
        <button
          onClick={handleMouseDown}
          className="position-absolute menu-close btn "
        >
          <img src="/fixed/CloseButtonGold.svg" alt="" />
        </button>
        <img src="/LogoBig.svg" alt="" height="90" width="55" />
        <h1>AUCOVA</h1>
        <h5>Jewellery Asset Management</h5>
      </div>

      <ul className="navbar-nav  mb-2 mb-lg-0">
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/"
        >
          <li className="nav-item">
            <h5>Home</h5>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/about"
        >
          <li className="nav-item">
            <h5>About</h5>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/portfolio"
        >
          <li className="nav-item">
            <h5>My Portfolio</h5>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/dispatch"
        >
          <li className="nav-item">
            <h5>News</h5>
          </li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/dispatch"
        >
          <li className="nav-item">
            <h5>Request for Services</h5>
          </li>
        </NavLink>
        <div style={{ margin: "27px" }}></div>
        <NavLink
          className={({ isActive }) => (isActive ? "activeStyle" : undefined)}
          to="/settings"
        >
          <li className="nav-item">
            <h5>Settings</h5>
          </li>
        </NavLink>
        <li className="nav-item" onClick={() => handleAuthentication()}>
          <h5>{user ? "Log out" : "Log In"}</h5>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
