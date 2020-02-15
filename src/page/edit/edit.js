import React, { Component } from "react";
import { connect } from "react-redux";
import { changeColor, changeFontBody, changeFontTitle } from "../../actions";
import { themes } from "../../constant/constant";
import EditLayout from "../../layout/editor";

class EditPage extends Component {
  render() {
    const {
      themeName,
      changeFontTitle,
      changeColor,
      changeFontBody
    } = this.props;
    const theme = themes.find(element => element.name === themeName);
    return (
      <EditLayout>
        {theme.component}
        {changeColor(theme.color)}
        {changeFontTitle(theme.fontTitle)}
        {changeFontBody(theme.fontBody)}
      </EditLayout>
    );
  }
}

const mapStateToProps = state => ({
  themeName: state.theme.name
});

const mapDispatchToProps = dispatch => ({
  changeColor: color => dispatch(changeColor(color)),
  changeFontTitle: fontTitle => dispatch(changeFontTitle(fontTitle)),
  changeFontBody: fontBody => dispatch(changeFontBody(fontBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
