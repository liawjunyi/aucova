import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import store from "./redux/store";
import { Provider } from "react-redux";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
