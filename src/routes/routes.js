import EditPage from "../page/edit/edit";
import DesignPage from "../theme/theme1/components/DesignPage";
import MainPage from "../page/main/main";
// View generated site
import ViewSitePage from "../page/view/ViewSite";

import PreLoginPage from "../page/login";

export const Routes = [
  {
    component: PreLoginPage,
    exact: true,
    path: "/"
  },
  {
    component: EditPage,
    path: "/edit"
  },
  {
    component: MainPage,
    path: "/view"
  },
  {
    component: DesignPage,
    path: "/design"
  },
  {
    component: ViewSitePage,
    path: "/:id"
  }
];
