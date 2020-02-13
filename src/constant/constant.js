import Theme2 from "../theme/theme2";
import Theme3 from "../theme/theme3";
import Theme4 from "../theme/theme4";
import React from "react";
import MainPage from "../page/main/main";
import LoginPage from "../page/login/login";
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
  { name: "Main", component: <MainPage /> },
  { name: "Login", component: <LoginPage /> }
];
