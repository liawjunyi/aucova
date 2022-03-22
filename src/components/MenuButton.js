const MenuButton = (props) => {
  return (
    <button id="roundButton" onClick={props.handleMouseDown}>
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

export default MenuButton;
