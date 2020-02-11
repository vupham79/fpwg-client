import EditPage from "../page/edit/edit";
import LoginPage from "../page/login/login";
import DesignPage from "../theme/theme1/components/DesignPage";
import MainPage from "../page/main/main";
import ViewPage from "../page/view/viewpage";

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
  },
  {
    component: ViewPage,
    path: "/home/:id"
  }
];
