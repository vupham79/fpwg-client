import React, { Component } from "react";
import { connect } from "react-redux";
import AdminLayout from "../../layout/adminLayout";
import TableUser from "../../component/TableUser";
import TableSite from "../../component/TableSite";
import TableTheme from "../../component/TableTheme";
import LoginPage from "./loginAdmin";
import TablePath from "../../component/TablePath";
import TableCategory from "../../component/TableCategory";
class PreDashboardPage extends Component {
  render() {
    const { selectedAdminIndex, isLoginAdmin } = this.props;
    if (!isLoginAdmin) {
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
            4: <TableCategory />,
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
  isLoginAdmin: state.admin.isLoginAdmin
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);
