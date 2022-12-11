import React from "react";
import ReactDOM from "react-dom/client";
import { Viewer } from "namisa";
import "namisa/dist/style.css";
import "./App.css";

const components = import.meta.glob("/src/**/*.mdx");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Viewer components={components} />
  </React.StrictMode>
);
