import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoutes({ component: RouteComponent, user, ...rest }) {
  return (
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
  );
}

const mapStateToProps = (reducers) => {
  return reducers.authenticate;
};

export default connect(mapStateToProps)(PrivateRoutes);
