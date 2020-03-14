import React from "react";
import PreEditPage from "../page/edit";
import EditPage from "../page/edit/edit";
import PreLoginPage from "../page/login";
import LoginPage from "../page/login/login";
import PreMainPage from "../page/main";
import MainPage from "../page/main/main";
import Theme1 from "../theme/theme1";
import PreAboutPageT1 from "../theme/theme1/pages/about";
import PreContactPageT1 from "../theme/theme1/pages/contact";
import PreEventPageT1 from "../theme/theme1/pages/event";
import PreGalleryPageT1 from "../theme/theme1/pages/gallery";
import PreHomePageT1 from "../theme/theme1/pages/home";
import PreNewPageT1 from "../theme/theme1/pages/new";
import Theme2 from "../theme/theme2";
import PreAboutPage from "../theme/theme2/pages/about";
import PreContactPage from "../theme/theme2/pages/contact";
import PreEventPage from "../theme/theme2/pages/event";
import PreGalleryPage from "../theme/theme2/pages/gallery";
import PreHomePage from "../theme/theme2/pages/home";
import PreNewPage from "../theme/theme2/pages/new";
import Theme4 from "../theme/theme4";
import PreAboutPageT4 from "../theme/theme4/pages/about";
import PreContactPageT4 from "../theme/theme4/pages/contact";
import PreEventPageT4 from "../theme/theme4/pages/event";
import PreGalleryPageT4 from "../theme/theme4/pages/gallery";
import PreHomePageT4 from "../theme/theme4/pages/home";
import PreNewPageT4 from "../theme/theme4/pages/new";

export const themes = [
  {
    id: "k5e520ab785bc282f048799ce",
    component: <Theme1 />,
    pages: [
      { name: "home", component: <PreHomePageT1 /> },
      { name: "about", component: <PreAboutPageT1 /> },
      { name: "contact", component: <PreContactPageT1 /> },
      { name: "event", component: <PreEventPageT1 /> },
      { name: "gallery", component: <PreGalleryPageT1 /> },
      { name: "news", component: <PreNewPageT1 /> }
    ]
  },
  {
    id: "5e50a9d494f9d83350f7398d",
    component: <Theme2 />,
    pages: [
      { name: "home", component: <PreHomePage /> },
      { name: "about", component: <PreAboutPage /> },
      { name: "contact", component: <PreContactPage /> },
      { name: "event", component: <PreEventPage /> },
      { name: "gallery", component: <PreGalleryPage /> },
      { name: "news", component: <PreNewPage /> }
    ]
  },
  {
    id: "z7e520ab785bc282f048799ce",
    component: <Theme4 />,
    pages: [
      { name: "home", component: <PreHomePageT4 /> },
      { name: "about", component: <PreAboutPageT4 /> },
      { name: "contact", component: <PreContactPageT4 /> },
      { name: "event", component: <PreEventPageT4 /> },
      { name: "gallery", component: <PreGalleryPageT4 /> },
      { name: "news", component: <PreNewPageT4 /> }
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

export const theme4Pages = [
  { name: "home", component: <PreHomePageT4 /> },
  { name: "about", component: <PreAboutPageT4 /> },
  { name: "contact", component: <PreContactPageT4 /> },
  { name: "event", component: <PreEventPageT4 /> },
  { name: "gallery", component: <PreGalleryPageT4 /> },
  { name: "new", component: <PreNewPageT4 /> }
];
