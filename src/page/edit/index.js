import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EditPage from "./edit";
import {
  getAllThemes,
  getSiteById,
  setSiteEdit,
  showLoading,
  closeLoading
} from "../../actions";
class PreEditPage extends React.Component {
  componentDidMount() {
    const { isLogin, showLoading, closeLoading } = this.props;
    if (isLogin) {
      showLoading();
      this.getAllThemes();
      this.getSite();
      closeLoading();
    }
  }

  getAllThemes = async () => {
    const { getAllThemes } = this.props;
    await getAllThemes();
  };

  getSite = async () => {
    const { getSiteById, setSiteEdit, currentEditId } = this.props;
    const data = await getSiteById(currentEditId);
    const titleStyle = {
      fontFamily: data.fontTitle,
      color: data.color
    };
    const bodyStyle = {
      fontFamily: data.fontBody
    };
    await setSiteEdit(data, titleStyle, bodyStyle);
  };

  render() {
    const { isLogin, siteEdit, loading } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    }
    if (siteEdit && !loading) {
      return <EditPage />;
    }
    return <></>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  currentEditId: state.site.currentEditId,
  siteEdit: state.site.siteEdit,
  loading: state.spinner.loading
});

const mapDispatchToProps = dispatch => ({
  getAllThemes: () => dispatch(getAllThemes()),
  getSiteById: id => dispatch(getSiteById(id)),
  setSiteEdit: (site, titleStyle, bodyStyle) =>
    dispatch(setSiteEdit(site, titleStyle, bodyStyle)),
  closeLoading: () => dispatch(closeLoading()),
  showLoading: () => dispatch(showLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEditPage);
