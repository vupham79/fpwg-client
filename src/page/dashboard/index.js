import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/user";
import { getAllSites } from "../../actions/site";
import { getAllThemes } from "../../actions/theme";
import AdminLayout from "../../layout/adminLayout";
import TableUser from "../../component/TableUser";
import TableSite from "../../component/TableSite";
import TableTheme from "../../component/TableTheme";

class PreDashboardPage extends Component {
  getUsers = async () => {
    const { accessToken, userId, getAllUsers } = this.props;
    await getAllUsers({ accessToken, userId });
  };

  getSites = async () => {
    const { accessToken, userId, getAllSites } = this.props;
    await getAllSites({ accessToken, userId });
  };

  getThemes = async () => {
    const { getAllThemesAdmin } = this.props;
    await getAllThemesAdmin();
  };

  componentDidMount() {}

  render() {
    const { selectedAdminIndex } = this.props;
    // if (!isLogin || !isAdmin) {
    //   return <Redirect to="/" />;
    // }

    let component = null;
    switch (selectedAdminIndex) {
      case 0:
        component = <TableUser />;
        this.getUsers();
        break;
      case 1:
        component = <TableSite />;
        this.getSites();
        break;
      case 2:
        component = <TableTheme />;
        this.getThemes();
        break;
      default:
        component = <TableUser />;
        this.getUsers();
        break;
    }

    return <AdminLayout>{!selectedAdminIndex && component}</AdminLayout>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  isAdmin: state.user.isAdmin,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  selectedAdminIndex: state.adminTab.selectedAdminIndex,
  sites: state.site.adminData
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: (id, accessToken) => dispatch(getAllUsers(id, accessToken)),
  getAllSites: (id, accessToken) => dispatch(getAllSites(id, accessToken)),
  getAllThemesAdmin: () => dispatch(getAllThemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);
