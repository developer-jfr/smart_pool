import styles from "./index.module.scss";
import WhButton from "components/buttons/wh-button";
//Image
import logo from "assets/Logo.svg";
import metamask from 'assets/metamask.svg';

const NavBar = () => {
  return (
    <nav
      className={`navbar ${styles.navbar_wrapp}`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <img className="navbar-item is-clickable" src={logo} />

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            <WhButton text="Вход" isSmall={true} />
          </a>

          <a className="navbar-item" href="#">
          <img src={metamask} alt="metamask" />
          </a>

        </div>

        <div className="navbar-end">
          <a href="/" className="navbar-item">
          <WhButton />
          </a>
          <a href="/" className="navbar-item">
          <WhButton text="english"  isBorder={true}/>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
