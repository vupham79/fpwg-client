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
      return (
        <EditLayout>
          {!!theme && theme.component}
          <div id="fb-root">
            <div
              class="fb-customerchat"
              attribution="setup_tool"
              page_id="110628947267722"
              theme_color="#0084ff"
            />
          </div>
        </EditLayout>
      );
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
