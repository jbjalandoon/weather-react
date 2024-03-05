import "./MobileNav.css";
import NavActions from "./NavActions";
import NavLinks from "./NavLinks";

function MobileNav(props: { toggle: boolean }) {
  return (
    <nav className={"header__nav-mobile" + (props.toggle ? " active" : " ")}>
      <NavLinks />
      <NavActions />
    </nav>
  );
}

export default MobileNav;
