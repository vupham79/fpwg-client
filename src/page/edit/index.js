import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
import { getAllThemes } from "../../actions";
class PreEditPage extends React.Component {
  componentDidMount() {
    this.props.getAllThemes();
  }

  render() {
    const { isLogin } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    return <EditPage />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin
});

const mapDispatchToProps = dispatch => ({
  getAllThemes: () => dispatch(getAllThemes())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEditPage);
