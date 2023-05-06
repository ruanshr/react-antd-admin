import React, { Provider } from "react"
import { BrowserRouter } from "react-router-dom";
import "./styles/App.css"
import { Router } from "./router"


export function App() {
  return (<div className="App">
    <BrowserRouter>
      <div>
        <Router ></Router>
      </div>
    </BrowserRouter>
  </div>)
}