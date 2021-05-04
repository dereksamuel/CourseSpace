import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "../Header/index.jsx";

function PrivateRoutes({ component: RouteComponent, user, ...rest }) {
  return (
    <>
      { location.pathname !== "/login" && <Header></Header> }
      <Route
        {...rest}
        render={routeProps =>
          !!user ? (
            <RouteComponent {...routeProps} />
          )
          : (
            <Redirect to={"/login"} />
          )}
      />
    </>
  );
}

const mapStateToProps = (reducers) => {
  return reducers.authenticate;
};

export default connect(mapStateToProps)(PrivateRoutes);
