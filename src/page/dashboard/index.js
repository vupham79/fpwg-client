import React, { Component } from "react";
import { connect } from "react-redux";
import AdminLayout from "../../layout/adminLayout";
import TableUser from "../../component/TableUser";
import TableSite from "../../component/TableSite";
import TableTheme from "../../component/TableTheme";
import LoginPage from "./loginAdmin";
import TablePath from "../../component/TablePath";

class PreDashboardPage extends Component {
  render() {
    const { selectedAdminIndex, username, password } = this.props;
    if (!username || !password) {
      return <LoginPage />;
    }
    return (
      <AdminLayout>
        {
          {
            0: <TableUser />,
            1: <TableSite />,
            2: <TableTheme />,
            3: <TablePath />,
            default: <TableUser />
          }[selectedAdminIndex]
        }
      </AdminLayout>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
  selectedAdminIndex: state.adminTab.selectedAdminIndex,
  username: state.admin.username,
  password: state.admin.password
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);
