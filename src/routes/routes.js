import HomePage from "../pages/home/home";
import NewPage from "../pages/new/new";
import AboutPage from "../pages/about/about";

export const Routes = [
  {
    component: HomePage,
    exact: true,
    path: "/"
  },
  {
    component: NewPage,
    path: "/New"
  },
  {
    component: AboutPage,
    path: "/About"
  }
];
