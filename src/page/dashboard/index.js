import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllUsers } from "../../actions/user";
import DashBoardPage from "./dashboard";
import AdminLayout from "../../layout/adminLayout";
import userTable from "./userTable";
import TableUser from "../../component/TableUser";


class PreDashboardPage extends Component {
  getAll = async () => {
    const { accessToken, userId, getAllUsers } = this.props;
    await getAllUsers({ accessToken, userId });
  };

  componentDidMount() {
    this.getAll();
  }

  render() {
    const { isLogin, isAdmin } = this.props;
    // if (!isLogin || !isAdmin) {
    //   return <Redirect to="/" />;
    // }
    return <AdminLayout><TableUser /> </AdminLayout>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  isAdmin: state.user.isAdmin,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id
});

const mapDispatchToProps = dispatch => ({
  getAllUsers: (id, accessToken) => dispatch(getAllUsers(id, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreDashboardPage);