import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

export default function render() {
  const app = renderToString(React.createElement(App));
  return app;
}
