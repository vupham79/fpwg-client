import HomePage from "../pages/home";
import NewPage from "../pages/new";
import AboutPage from "../pages/about";
import EventPage from "../pages/event";
import ContactPage from "../pages/contact";
import GalleryPage from "../pages/gallery";

export const Routes = [
  {
    component: HomePage,
    exact: true,
    path: "/:id",
  },
  {
    component: HomePage,
    path: "/:id/Home",
  },
  // {
  //   component: NewPage,
  //   path: "/:id/News"
  // },
  // {
  //   component: AboutPage,
  //   path: "/:id/About"
  // },
  // {
  //   component: EventPage,
  //   path: "/:id/Event"
  // },
  // {
  //   component: ContactPage,
  //   path: "/:id/Contact"
  // },
  // {
  //   component: GalleryPage,
  //   path: "/:id/Gallery"
  // }
];
