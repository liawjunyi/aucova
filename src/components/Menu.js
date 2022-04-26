import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useNavigate,
} from "react-router-dom";
import { auth } from "../firebase";
import { logout, selectUser } from "../redux/authSlice";

function Menu(props) {
  let className = "menu";
  if (props.menuVisibility) {
    className += " show";
  } else {
    className += " hide";
  }

  const user = useSelector(selectUser);
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
  };

  return (
    <div className={className} id="flyoutMenu">
      <div className="menuheader">
        <button
          onClick={props.handleMouseDown}
          className="position-absolute btn-close btn "
        ></button>

        <h1>AUCOVA</h1>
        <h4>Jewellery Asset Management</h4>
      </div>

      <ul className="navbar-nav  mb-2 mb-lg-0">
        <li className="nav-item">
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link style={{ textDecoration: "none" }} to="/dispatch">
            Aucova Dispatch
          </Link>
        </li>
        <li className="nav-item">
          <Link style={{ textDecoration: "none" }} to="/portfolio">
            My Portfolio
          </Link>
        </li>
        <li className="nav-item" onClick={() => handleAuthentication()}>
          {user ? "Log out" : "Log In"}
        </li>
      </ul>
    </div>
  );
}

export default Menu;
