import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Layout from "../layout/layout";
import { Routes } from "../../../routes/routes";

function ShowPage() {
  return (
    <BrowserRouter>
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
      </BrowserRouter>
  );
}

export default ShowPage;
