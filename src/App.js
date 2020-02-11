import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.map(route => (
          <Route
            key={route.path}
            exact={route.exact}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
