import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/user";
import { getAllSites } from "../../actions/site";
import { getAllThemes } from "../../actions/theme";
import AdminLayout from "../../layout/adminLayout";
import TableUser from "../../component/TableUser";
import TableSite from "../../component/TableSite";
import TableTheme from "../../component/TableTheme";
// import userTable from "./userTable";


class PreDashboardPage extends Component {

  // renderSwitch(param) {
  //   switch (param) {
  //     case 0:
  //       this.getUsers();
  //       return <TableUser />;
  //     case 1:
  //       return <TableSite />;
  //     case 2:
  //       return <TableTheme />
  //     default:
  //       return <TableUser />;
  //   }
  // }

  render() {
    const { isLogin, isAdmin, selectedAdminIndex } = this.props;
    // if (!isLogin || !isAdmin) {
    //   return <Redirect to="/" />;
    // }

    return (
      <AdminLayout>
        {/* {!selectedAdminIndex && this.renderSwitch(selectedAdminIndex)}{selectedAdminIndex} */}
        {{
          0: (
            <TableUser />
          ),
          1: (
            <TableSite />
          ),
          2: (
            <TableTheme />
          ),
          default: (
            <TableUser />
          )
        }[selectedAdminIndex]}
      </AdminLayout>
    );
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);
