import PreEditPage from "../page/edit";
import DesignPage from "../theme/theme1/components/DesignPage";
import PreMainPage from "../page/main";
import PreDashboardPage from "../page/dashboard";
// View generated site
import ViewSitePage from "../page/view";
import PreviewSitePage from "../page/preview";
import PreLoginPage from "../page/login";
import CreateNewSite from "../page/createNewSite";

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
    component: CreateNewSite,
    path: "/create"
  },
  {
    component: PreDashboardPage,
    exact: true,
    path: "/admin"
  },
  {
    component: PreviewSitePage,
    path: "/preview"
  },
  {
    component: ViewSitePage,
    path: "/:id"
  }
];
