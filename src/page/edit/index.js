import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
import { getAllThemes, getSiteById, setSiteEdit } from "../../actions";
class PreEditPage extends React.Component {
  componentDidMount() {
    const { isLogin } = this.props;
    if (isLogin) {
      this.getAllThemes();
      this.getSite();
    }
  }

  getAllThemes = async () => {
    const { getAllThemes } = this.props;
    await getAllThemes();
  };

  getSite = async () => {
    const { getSiteById, setSiteEdit, currentEditId } = this.props;
    const data = await getSiteById(currentEditId);
    if (data) {
      const titleStyle = {
        fontFamily: data.fontTitle,
        color: data.color
      };
      const bodyStyle = {
        fontFamily: data.fontBody
      };
      await setSiteEdit(data, titleStyle, bodyStyle);
    }
  };

  render() {
    const { isLogin, siteEdit } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    } else if (siteEdit) {
      return <EditPage />;
    }
    return <h1 style={{ color: "red", textAlign: "center" }}>404 Not Found</h1>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  currentEditId: state.site.currentEditId,
  siteEdit: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  getAllThemes: () => dispatch(getAllThemes()),
  getSiteById: id => dispatch(getSiteById(id)),
  setSiteEdit: (site, titleStyle, bodyStyle) =>
    dispatch(setSiteEdit(site, titleStyle, bodyStyle))
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEditPage);
