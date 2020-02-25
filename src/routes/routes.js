import PreEditPage from "../page/edit";
import DesignPage from "../theme/theme1/components/DesignPage";
import PreMainPage from "../page/main";
// View generated site
import ViewSitePage from "../page/view";

import PreLoginPage from "../page/login";

export const Routes = [
  {
    component: PreLoginPage,
    exact: true,
    path: "/"
  },
  {
    component: PreEditPage,
    path: "/edit"
  },
  {
    component: PreMainPage,
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
