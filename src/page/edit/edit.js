import React, { Component } from "react";
import { connect } from "react-redux";
import { themes as themesConstant } from "../../constant/constant";
import EditLayout from "../../layout/editor";

class EditPage extends Component {
  render() {
    const { themes, siteEdit } = this.props;
    // const themeName = themes && themes.find(e => e._id === siteEdit.themeId);
    const theme =
      siteEdit && themesConstant.find(e => e.name === siteEdit.theme.name);
    return <EditLayout>{theme && theme.component}</EditLayout>;
  }
}

const mapStateToProps = state => ({
  themes: state.theme.data,
  siteEdit: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
