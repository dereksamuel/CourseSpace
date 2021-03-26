// import React, { useEffect, useState } from "react";
// import fb from "../../helpers/firebase_config";
// import { connect } from "react-redux";
// import * as authenticateActions from "../../actions/authenticate";

// export const AuthContext = React.createContext({});

// function AuthProvider({ children, setLoading, getAll, loading }) {

//   useEffect(async () => {
//     const response = await new Promise((res) => fb.auth().onAuthStateChanged(res));
//     console.log("Im here");//TODO: Haz el login poniendo el auth sobre todo el custom provider y luego lo devuelves a no manejar el store
//     getAll(response);
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <p>Loading. . .</p>
//   }

//   return (
//     <div>{children}</div>
//   );
// }

// const mapStateToProps = (reducers) => {
//   return reducers.authenticate;
// };

// export default connect(mapStateToProps, authenticateActions)(AuthProvider);
