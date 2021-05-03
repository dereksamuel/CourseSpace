import React from 'react';
import { Layout } from "./styles.js";
import { connect } from "react-redux";
import Logo from "../../assets/logo_lg.svg";
import LogoSM from "../../assets/logo_sm.svg";
import DefaultUserImage from "../../assets/default_user.svg";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaStepBackward } from "react-icons/fa";
import "./styles.css";

function Header({ user }) {
  const showMenu = () => {
    const menu =document.querySelector(".right");
    menu.classList.remove("display_none");
  };

  const showMenuBack = () => {
    const menu =document.querySelector(".right");
    menu.classList.add("display_none");
  };

  return (
    <Layout>
      <section className="Header_1">
        <nav>
          <Link to="/help" style={{ borderRight: "2px solid", paddingRight: "0.3rem", marginRight: "0.2rem", }}>ayuda</Link>
          <Link to="/profile" style={{ display: "flex", alignItems: "center", }}>{user?.email.split("@")[0]} <img src={user?.photoURL || DefaultUserImage} alt="logo"/></Link>
        </nav>
      </section>
      <section className="Header_2">
        <nav>
          <Link to="/">
            <picture>
              <source media="(min-width: 768px)" srcSet={Logo} />
              <img src={LogoSM} alt="logo"/>
            </picture>
          </Link>

          <div>
            <div className="menuItem" style={{ color:"#fff", fontSize: "1.4rem", paddingRight: "1rem" }} onClick={showMenu}><FaEllipsisV></FaEllipsisV></div>
            <div className="right display_none">
              <p className="menuItem" onClick={showMenuBack} style={{ display: "flex", alignItems: "center", color: "white", }}>Atrás <FaStepBackward /></p>
              <Link to="/">Cursos</Link>
              <Link to="/analytics">Analíticas</Link>
              <Link to="/works">Tareas</Link>
              <Link to="/search">Buscar</Link>
            </div>
          </div>
        </nav>
      </section>
    </Layout>
  )
}

const mapStateToProps = (reducers) => reducers.authenticate;

export default connect(mapStateToProps)(Header);
