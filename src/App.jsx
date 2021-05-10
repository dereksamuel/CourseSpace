import React, { useEffect } from "react";
import ActionForms from "./components/ActionForms/index.jsx";
import { GlobalStyles } from "./globals.js";
import { connect } from "react-redux";
import * as authenticateActions from "./actions/authenticate";
import fb from "./helpers/firebase_config";

import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoutes.jsx";
import Courses from "./components/Courses/index.jsx";
import Works from "./components/Works/index.jsx";
import Header from "./components/Header/index.jsx";

function App({ setLoading, getAll, loading }) {
  useEffect(async () => {
    if (localStorage.getItem("rememberMe") === "false") {
      localStorage.removeItem("rememberMe");
      fb.auth().signOut();
    }
    fb.auth().onAuthStateChanged((response) => {
      if (response && !response?.emailVerified) return;
      getAll(response);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <p>Loading. . .</p>
  }

  return (
    <BrowserRouter>
      <GlobalStyles />
      <main>
        { location.pathname !== "/login" && <Header></Header> }
        <Route exact path="/login" component={ActionForms} />
        <PrivateRoute exact path="/" component={Courses} />
        <PrivateRoute exact path="/works" component={Works} />
        <PrivateRoute exact path="/work/:idCourse" component={Works} />
      </main>
    </BrowserRouter>
  );
};

const mapStateToProps = (reducers) => {
  return reducers.authenticate;
};

export default connect(mapStateToProps, authenticateActions)(App);
