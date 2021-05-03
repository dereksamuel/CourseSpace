import React, { useRef, useState } from "react";
import { Button, Input, Subtitle } from "../styles";
import { Form, Figure } from "./styles";
import Logo from "../../assets/logo_sm.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaRegCheckSquare } from "react-icons/fa";
import Particles from "react-particles-js";
import particlesJson from "../../helpers/particlesjs-config.json";
import fb from "../../helpers/firebase_config";
import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";
import Modal from "../Modal/index.jsx";

function ActionForms({ register = false, iconpre, iconpos, history, user }) {
  const [modeRegister, setModeRegister] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showMe, setShowMe] = useState(false);
  const [emailAddress, setEmailAddress] = useState(null);
  const [textButtonSend, setTextButtonSend] = useState("enviar");
  const [variantEmail, setVariantEmail] = useState("default");
  const form = useRef(null);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeSendEmail = (e) => setEmailAddress(e.target.value);
  const handleCheck = (e) => {
    const value = e.target.value;
    if (value === "on") localStorage.setItem("rememberMe", true);
    else localStorage.setItem("rememberMe", false);
  };

  const registerAction = async (e) => {
    setLoading(true);
    e.preventDefault();
    const checkInput = document.querySelector("#rememberMe");
    const config = {
      url: "http://localhost:8080/",
    };
    console.log(checkInput);
    try {
      const result = await fb.auth().createUserWithEmailAndPassword(email, password);
      result.user.updateProfile({
        displayName: name,
      });
      result.user.sendEmailVerification(config);
      fb.auth().signOut();
      setLoading(true);
      setError(`Bienvenido ${name}, para acceder a tu cuenta debes ver el email de verificación en tu cuenta`);
    } catch(error) {
      console.error(error);
      setError("Ha ocurrido un error");
    }
    const timeout = setTimeout(() => {
      setError(null);
      setLoading(false);
      clearTimeout(timeout);
    }, 6000);
  };

  const sendPasswordVerification = (e) => {
    e.preventDefault();
    if (!emailAddress) {
      setTextButtonSend("El campo de su correo es requerido");
      const timeout = setTimeout(() => {
        setTextButtonSend("enviar");
        clearTimeout(timeout);
      }, 3000);
      return;
    }
    console.log(emailAddress);
    fb.auth().sendPasswordResetEmail(emailAddress).then(function() {
      setVariantEmail("success");
      setTextButtonSend("correo enviado");
      const timeout = setTimeout(() => {
        setTextButtonSend("enviar");
        setVariantEmail("default");
        clearTimeout(timeout);
      }, 3000);
    }).catch(function(error) {
      console.error(error);
      setVariantEmail("error");
      setTextButtonSend("ocurrió un error");
      const timeout = setTimeout(() => {
        setTextButtonSend("enviar");
        setVariantEmail("default");
        clearTimeout(timeout);
      }, 3000);
    });
  };

  const loginAction = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(form.current);
    const newUser = {
      "email": formData.get("email"),
      "password": formData.get("password"),
      "rememberMe": formData.get("remember"),
    };

    const result = await fb.auth().signInWithEmailAndPassword(newUser.email, newUser.password).catch((error) => {
      console.error(error);
      setError("Ha ocurrido un error");
      const timeout = setTimeout(() => {
        setError(null);
        clearTimeout(timeout);
      }, 4000);
    });
    setLoading(false);
    if (!!!result.user.emailVerified) {
      fb.auth().signOut();
      setError("Por favor verifica tu correo");
      const timeout = setTimeout(() => {
        setError(null);
        clearTimeout(timeout);
      }, 4000);
    }
    else {
      if (!!!newUser.rememberMe) localStorage.setItem("rememberMe", false);
      history.push("/");
    }
  };

  const loginActionGoogle = () => {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().signInWithPopup(provider)
      .then(() => {
        if (!!!localStorage.getItem("rememberMe")) localStorage.setItem("rememberMe", false);
        else localStorage.setItem("rememberMe", true);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
        setError("Ha ocurrido un error");
        const timeout = setTimeout(() => {
          setError(null);
          clearTimeout(timeout);
        }, 4000);
      });
  }

  if (user) {
    return <Redirect to="/"></Redirect>
  }

  return (
    <>
      <Modal
        showMe={showMe}
        setShowMe={setShowMe}
        title="Recuperar Contraseña"
        buttons
        secondButton={
          <Button
            disabled={textButtonSend === "enviar" ? false : true}
            size_f="1rem"
            padding="0.8rem 1.5rem"
            onClick={sendPasswordVerification}
            type="submit"
            form="modalSend"
            variant={variantEmail}>
            {textButtonSend}
          </Button>
        }
        >
        <form id="modalSend">
          <p style={{ maxWidth: "350px", textAlign: "center", }}>
            Por favor envíanos tu correo electrónico,
            en él le mandaremos un correo de verificación.
            Puede escribirlo aquí:
          </p>
          <Input style={{ margin: "0 10px", marginTop: "1rem", fontSize: "0.6rem", }}>
            <input type="text" placeholder="Correo electrónico" name="email" onChange={handleChangeSendEmail} required />
          </Input>
        </form>
      </Modal>
      <Particles
        style={{ position: "fixed", top: "0", bottom: "0", }}
        params={particlesJson}
      ></Particles>
      <Form ref={form}>
        <Figure>
          <img src={Logo} alt="logo"/>
        </Figure>
        <TransitionGroup>
          <CSSTransition
            key={modeRegister}
            in={modeRegister}
            timeout={300}
            appear={true}
            classNames="fade"
          >
            { !register && !modeRegister ?
                <section className="Login">
                  <Input style={{ margin: "0 10px", marginTop: "2rem", }}>
                    <i>{iconpre}</i>
                    <input type="text" placeholder="Correo electrónico" name="email" />
                    <i>{iconpos}</i>
                  </Input>
                  <Input style={{ margin: "0 10px", marginTop: "2rem", }}>
                    <i>{iconpre}</i>
                    <input type="password" placeholder="Contraseña" name="password" />
                    <i>{iconpos}</i>
                  </Input>
                  <div className="flex">
                    <p>
                      <input type="checkbox" name="remember" id="rememberMe" onChange={handleCheck} />
                      <label htmlFor="rememberMe">Recordarme</label>
                    </p>
                    <a href="#" onClick={() => setShowMe(true)}>¿olvidó su contraseña?</a>
                  </div>
                  <div className="center_container">
                    <Button padding="1.5rem" size_f="1.4rem" type="submit" onClick={loginAction}>{ error ? error : loading ? "Cargando" : "Iniciar Sesión" }</Button>
                    <Button
                      padding="1rem"
                      size_f="1rem"
                      variant="gray"
                      onClick={() => setModeRegister(true)}
                      type="button"
                    >¿No tienes cuenta? Regístrate aquí</Button>
                  </div>
                  <Subtitle background="white">
                    <p>O inica sesión aquí</p>
                  </Subtitle>
                  <Button padding="1.5rem" size_f="1.4rem" onClick={loginActionGoogle} type="button">Con Google</Button>
                </section>
                :
                <section className="Register">
                  <Input style={{ margin: "0 10px", marginTop: "2rem", }}>
                    <i>{iconpre}</i>
                    <input type="text" placeholder="Correo electrónico" name="email" onChange={handleChangeEmail} />
                    <i>{iconpos}</i>
                  </Input>
                  <div className="flex">
                    <p style={{ color: !email ? "" : email.includes("@") ? "green" : "red" }}><FaRegCheckSquare></FaRegCheckSquare> Debe contener @</p>
                    <p style={{ color: !email ? "" : email.includes(".com") || email.includes(".es") || email.includes(".co") || email.includes(".net") ? "green" : "red" }}><FaRegCheckSquare></FaRegCheckSquare> Ponle un dominio</p>
                  </div>
                  <Input style={{ margin: "0 10px", marginTop: "2rem", }}>
                    <i>{iconpre}</i>
                    <input type="password" placeholder="Contraseña" name="password" onChange={handleChangePassword} />
                    <i>{iconpos}</i>
                  </Input>
                  <div className="flex">
                    <p style={{ color: !password ? "" : password.length > 8 ? "green" : "red" }}><FaRegCheckSquare></FaRegCheckSquare> Debe contener más de 8 caracteres</p>
                    {/* <p><FaRegCheckSquare></FaRegCheckSquare> Debe tener mayúsculas</p> */}
                  </div>
                  <Input style={{ margin: "0 10px", marginTop: "2rem", }}>
                    <i>{iconpre}</i>
                    <input type="text" placeholder="Nombre completo" name="name" onChange={handleChangeName} required />
                    <i>{iconpos}</i>
                  </Input>
                  <div className="center_container">
                    <Button type="submit" padding="1.5rem" size_f="1.4rem" onClick={registerAction} disabled={!email || !password || !name}>{error ? error : loading ? "Cargando" : "Registrarse"}</Button>
                    <Button
                      padding="1rem"
                      size_f="1rem"
                      variant="gray"
                      onClick={() => setModeRegister(false)}
                      type="button"
                    >¿Tienes cuenta? Inicia Sesión aquí</Button>
                  </div>
                  <Subtitle background="white">
                    <p>O regístrate aquí</p>
                  </Subtitle>
                  <Button padding="1.5rem" size_f="1.4rem" onClick={loginActionGoogle} type="button">Con Google</Button>
                </section>
            }
          </CSSTransition>
        </TransitionGroup>
      </Form>
    </>
  )
};

const mapStateToProps = (reducers) => {
  return reducers.authenticate;
};

export default connect(mapStateToProps)(withRouter(ActionForms));
