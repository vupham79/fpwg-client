import React, { Component } from "react";
import { connect } from "react-redux";
import { themes } from "../../constant/constant";
import EditLayout from "../../layout/editor";

class EditPage extends Component {
  render() {
    const { themeName } = this.props;

    const theme = themes.find(element => element.name === themeName);

    return <EditLayout>{theme.component}</EditLayout>;
  }
}

const mapStateToProps = state => ({
  themeName: state.theme.name
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
