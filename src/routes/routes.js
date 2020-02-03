import HomePage from "../pages/home";
import NewPage from "../pages/new";
import AboutPage from "../pages/about";
import EventPage from "../pages/event";
import ContactPage from "../pages/contact";
import GalleryPage from "../components/gallery";

export const Routes = [
  {
    component: HomePage,
    exact: true,
    path: "/"
  },
  {
    component: HomePage,
    path: "/Home"
  },
  {
    component: NewPage,
    path: "/New"
  },
  {
    component: AboutPage,
    path: "/About"
  },
  {
    component: EventPage,
    path: "/Event"
  },
  {
    component: ContactPage,
    path: "/Contact"
  },
  {
    component: GalleryPage,
    path: "/Gallery"
  }
];
