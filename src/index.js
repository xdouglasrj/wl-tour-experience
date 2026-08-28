import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = hydrateRoot(
  document.getElementById("root"),
  React.createElement(React.StrictMode, null, React.createElement(App)),
);
