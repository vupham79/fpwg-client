import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getAllPost,
  getAllThemes,
  getSiteById,
  setSiteEdit,
  setEditOn,
  closeSnackBar
} from "../../actions";
import EditPage from "./edit";
class PreEditPage extends React.Component {
  componentDidMount() {
    const { isLogin, setEditOn, closeSnackBar } = this.props;
    closeSnackBar();
    if (isLogin) {
      this.getAllThemes();
      this.getSite();
      setEditOn();
    }
  }

  getAllThemes = async () => {
    const { getAllThemes } = this.props;
    await getAllThemes();
  };

  getSite = async () => {
    const { getSiteById, setSiteEdit, currentEditId, getAllPost } = this.props;
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
      getAllPost(data.posts);
    }
  };

  render() {
    const { isLogin, siteEdit, isEdit } = this.props;
    if (!isLogin) {
      return <Redirect to="/" />;
    } else if (siteEdit && isEdit) {
      return <EditPage />;
    } else return <></>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
  currentEditId: state.site.currentEditId,
  siteEdit: state.site.siteEdit,
  posts: state.post.posts,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  getAllThemes: () => dispatch(getAllThemes()),
  getSiteById: id => dispatch(getSiteById(id)),
  setSiteEdit: (site, titleStyle, bodyStyle) =>
    dispatch(setSiteEdit(site, titleStyle, bodyStyle)),
  getAllPost: posts => dispatch(getAllPost(posts)),
  setEditOn: () => dispatch(setEditOn()),
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreEditPage);
