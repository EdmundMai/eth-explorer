import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux";

import Homepage from "./components/homepage";
import "./root.css";

render(
  <Provider store={store}>
    <Homepage />
  </Provider>,
  document.getElementById("root")
);
