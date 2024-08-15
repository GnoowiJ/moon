import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AdminApp from "./AdminApp";
import reportWebVitals from "./reportWebVitals";

//redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import revReducer from "./redux/reducers/revReducer.js";
import galReducer from "./redux/reducers/galReducer.js";
import popReducer from "./redux/reducers/popReducer.js";

const store = configureStore({
  reducer: {
    rev: revReducer,
    gal: galReducer,
    pop: popReducer
  },
});
const path = window.location.pathname;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {path.includes("/admin") ? <AdminApp /> : <App />}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
