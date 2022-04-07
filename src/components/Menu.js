import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function Menu(props) {
  let className = "menu";
  if (props.menuVisibility) {
    className += " show";
  } else {
    className += " hide";
  }

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
        <li className="nav-item">
          <a className="nav-link " href="#">
            Log out
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
