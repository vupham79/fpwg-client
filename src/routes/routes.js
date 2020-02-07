import HomePage from "../theme/theme2/pages/home/index";
import NewPage from "../theme/theme2/pages/new/index";
import AboutPage from "../theme/theme2/pages/about/index";
import EventPage from "../theme/theme2/pages/event/index";
import ContactPage from "../theme/theme2/pages/contact/index";
import GalleryPage from "../theme/theme2/pages/gallery/index";
import EditPage from "../theme/theme1/components/PageSelectPage"
import MainPage from "../theme/theme2/pages/main/main"

export const Routes = [
  {
    component: MainPage,
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
  },
  {
    component: EditPage,
    path: "/edit"
  }
];
