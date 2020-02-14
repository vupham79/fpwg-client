import Theme2 from "../theme/theme2";
import Theme3 from "../theme/theme3";
import Theme4 from "../theme/theme4";
import React from "react";
import PreMainPage from "../page/main";
import PreLoginPage from "../page/login";
import PreEditPage from "../page/edit";

import MainPage from "../page/main/main";
import LoginPage from "../page/login/login";
import EditPage from "../page/edit/edit";
export const themes = [
  {
    name: "theme1"
  },
  {
    name: "theme2",
    component: <Theme2 />
  },
  {
    name: "theme3",
    component: <Theme3 />
  },
  {
    name: "theme4",
    component: <Theme4 />
  },
  {
    name: "theme5"
  }
];

export const pages = [
  { name: "PreMain", component: <PreMainPage /> },
  { name: "PreLogin", component: <PreLoginPage /> },
  { name: "PreEdit", component: <PreEditPage /> },
  { name: "Login", component: <LoginPage /> },
  { name: "Main", component: <MainPage /> },
  { name: "Edit", component: <EditPage /> }
];
