import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
class PreEditPage extends React.Component {
  render() {
    const { isLogin } = this.props;
    return <>{isLogin ? <EditPage /> : <Redirect to="/" />}</>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

export default connect(mapStateToProps, null)(PreEditPage);
