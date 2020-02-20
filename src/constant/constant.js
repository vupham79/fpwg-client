import Theme1 from "../theme/theme1";
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
import PreHomePage from "../theme/theme2/pages/home";
import PreAboutPage from "../theme/theme2/pages/about";
import PreContactPage from "../theme/theme2/pages/contact";
import PreGalleryPage from "../theme/theme2/pages/gallery";
import PreNewPage from "../theme/theme2/pages/new";
import PreEventPage from "../theme/theme2/pages/event";

import PreHomePageT1 from "../theme/theme1/pages/home";
import PreAboutPageT1 from "../theme/theme1/pages/about";
import PreContactPageT1 from "../theme/theme1/pages/contact";
import PreGalleryPageT1 from "../theme/theme1/pages/gallery";
import PreNewPageT1 from "../theme/theme1/pages/new";
import PreEventPageT1 from "../theme/theme1/pages/event";

export const themes = [
  {
    name: "theme1",
    component: <Theme1 />,
    fontTitle: "Arial",
    fontBody: "Arial",
    color: "#FF6900"
    // pages: [
    //     { name: "home", component: <PreHomePage /> },
    //     { name: "about", component: <PreAboutPage /> },
    //     { name: "contact", component: <PreContactPage /> },
    //     { name: "event", component: <PreEventPage /> },
    //     { name: "gallery", component: <PreGalleryPage /> },
    //     { name: "new", component: <PreNewPage /> }
    //   ]
  },
  {
    name: "theme2",
    component: <Theme2 />,
    fontTitle: "Lora",
    fontBody: "Oswald",
    color: "#ABB8C3",
    pages: [
      { name: "home", component: <PreHomePage /> },
      { name: "about", component: <PreAboutPage /> },
      { name: "contact", component: <PreContactPage /> },
      { name: "event", component: <PreEventPage /> },
      { name: "gallery", component: <PreGalleryPage /> },
      { name: "new", component: <PreNewPage /> }
    ]
  },
  {
    name: "theme3",
    component: <Theme3 />,
    fontTitle: "Cabin",
    fontBody: "Cabin",
    color: "#191818",
    pages: [
      { name: "home", component: <PreHomePage /> },
      { name: "about", component: <PreAboutPage /> },
      { name: "contact", component: <PreContactPage /> },
      { name: "event", component: <PreEventPage /> },
      { name: "gallery", component: <PreGalleryPage /> },
      { name: "new", component: <PreNewPage /> }
    ]
  },
  {
    name: "theme4",
    component: <Theme4 />,
    fontTitle: "Barlow",
    fontBody: "Barlow",
    color: "#191818",
    pages: [
      { name: "home", component: <PreHomePage /> },
      { name: "about", component: <PreAboutPage /> },
      { name: "contact", component: <PreContactPage /> },
      { name: "event", component: <PreEventPage /> },
      { name: "gallery", component: <PreGalleryPage /> },
      { name: "new", component: <PreNewPage /> }
    ]
  }
];

export const pages = [
  { name: "PreMain", component: <PreMainPage /> },
  { name: "PreLogin", component: <PreLoginPage /> },
  { name: "PreEdit", component: PreEditPage },
  { name: "Login", component: <LoginPage /> },
  { name: "Main", component: <MainPage /> },
  { name: "Edit", component: EditPage }
];

export const theme1Pages = [
  { name: "home", component: <PreHomePageT1 /> },
  { name: "about", component: <PreAboutPageT1 /> },
  { name: "contact", component: <PreContactPageT1 /> },
  { name: "event", component: <PreEventPageT1 /> },
  { name: "gallery", component: <PreGalleryPageT1 /> },
  { name: "new", component: <PreNewPageT1 /> }
];

export const theme2Pages = [
  { name: "home", component: <PreHomePage /> },
  { name: "about", component: <PreAboutPage /> },
  { name: "contact", component: <PreContactPage /> },
  { name: "event", component: <PreEventPage /> },
  { name: "gallery", component: <PreGalleryPage /> },
  { name: "new", component: <PreNewPage /> }
];
