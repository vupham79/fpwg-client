import React, { Component } from "react";
import { connect } from "react-redux";
import { themes as themesConstant } from "../../constant/constant";
import EditLayout from "../../layout/editor";
import WebFontLoader from "webfontloader";
import { fontFamily } from "../../constant/constant";
class EditPage extends Component {
  render() {
    const { siteEdit } = this.props;
    if (siteEdit) {
      const theme = siteEdit
        ? themesConstant.find((e) => e.id === siteEdit.theme._id)
        : null;
      WebFontLoader.load({
        google: {
          families: fontFamily,
        },
      });
      return <EditLayout>{!!theme && theme.component}</EditLayout>;
    }
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  themes: state.theme.data,
  siteEdit: state.site.siteEdit,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
