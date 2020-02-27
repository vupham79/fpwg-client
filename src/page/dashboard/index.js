import React, { Component } from "react";
import { connect } from "react-redux";
import AdminLayout from "../../layout/adminLayout";
import TableUser from "../../component/TableUser";
import TableSite from "../../component/TableSite";
import TableTheme from "../../component/TableTheme";

class PreDashboardPage extends Component {

  render() {
    const { selectedAdminIndex } = this.props;
    // if (!isLogin || !isAdmin) {
    //   return <Redirect to="/" />;
    // }

    return (
      <AdminLayout>
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
