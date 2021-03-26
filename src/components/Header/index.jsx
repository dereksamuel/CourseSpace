import React from 'react';
import { Layout } from "./styles.js";
import { connect } from "react-redux";
import Logo from "../../assets/logo_lg.svg";
import LogoSM from "../../assets/logo_sm.svg";
import DefaultUserImage from "../../assets/default_user.svg";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

function Header({ user }) {
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
            <div style={{ color:"#fff", fontSize: "1.4rem", paddingRight: "1rem", }}><FaEllipsisV></FaEllipsisV></div>
            <div className="right display_none">
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
