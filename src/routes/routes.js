import EditPage from "../page/edit/edit";
import LoginPage from "../page/login/login";
import DesignPage from "../theme/theme1/components/DesignPage";
import MainPage from "../theme/theme2/pages/main/main";

export const Routes = [
  {
    component: LoginPage,
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
  }
];
