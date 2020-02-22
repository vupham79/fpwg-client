import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
import { getAllThemes } from "../../actions";
class PreEditPage extends React.Component {
  start = () => {
    this.props.getAllThemes();
  };
  render() {
    this.start();
    const { isLogin } = this.props;
    return <>{isLogin ? <EditPage /> : <Redirect to="/" />}</>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

const mapDispatchToProps = dispatch => ({
  getAllThemes: () => dispatch(getAllThemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEditPage);
