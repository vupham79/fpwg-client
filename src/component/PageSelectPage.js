import React from "react";
import UserProfileFacebook from "../theme/theme1/components/UserProfileFB";
import CustomNavBarEditor from "../component/SideBarEditor";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../theme/theme1/components/HomePage";
import DesignPage from "../theme/theme1/components/DesignPage";

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
