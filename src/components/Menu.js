function Menu(props) {
  let className = "menu";
  if (props.menuVisibility) {
    className += " show";
  } else {
    className += " hide";
  }

  return (
    <div className={className} id="flyoutMenu" onClick={props.handleMouseDown}>
      <div className="menuheader">
        <div className="position-absolute btn-close end-0 "></div>

        <h1>AUCOVA</h1>
        <h4>Jewellery Asset Management</h4>
      </div>

      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Aucova Dispatch
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            My Portfolio
          </a>
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
