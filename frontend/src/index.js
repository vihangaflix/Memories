import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import App from "./App";
import { GoogleOAuthProvider } from '@react-oauth/google';


const store = configureStore({
  reducer: reducers,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="403940769245-a1tnjmujfre5gnd1sb2qraift3pkr0fu.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </Provider>
);
