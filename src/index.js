import React from "react";
import ReactDom from "react-dom";
import "./helpers/firebase_config";
import App from "./App.jsx";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import reduxThunk from "redux-thunk";

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDom.render(
  <Provider store={store}>
    <App></App>
  </Provider>
  , document.querySelector("#live"));
