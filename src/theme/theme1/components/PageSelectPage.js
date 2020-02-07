import React from "react";
import UserProfileFacebook from "./UserProfileFB";
import CustomNavBarEditor from "./CustomNavBarEditor";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import DesignPage from "./DesignPage";

const PageSelectPage = () => {
  return (
    <BrowserRouter>
      <CustomNavBarEditor />
      <Switch>
        <Route path="/design" component={DesignPage} />
        <Route path="/pages" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
};

export default PageSelectPage;
