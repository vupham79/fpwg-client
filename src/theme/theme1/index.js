import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../theme1/layout/layout";
import { Routes } from "./routes/routes";

class Theme1 extends React.Component {
  render() {
    return (
      <Layout>
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
      </Layout>
    );
  }
}

export default Theme1;
