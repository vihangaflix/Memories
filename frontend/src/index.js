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
    <GoogleOAuthProvider clientId="1099275760511-i99rp5sl2ni5lldj0qs100ninfd8pm72.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </Provider>
);
