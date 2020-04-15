import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../theme3/layout/layout";
import { Routes } from "./routes/routes";
import NotFound from "./components/NotFound";

class Theme3 extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {Routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
          <Route path="*" exact={true} component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}
export default Theme3;
