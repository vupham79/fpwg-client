/*eslint no-lone-blocks: "error"*/
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { publishSite, unPublishSite } from "../actions";
import { connect } from "react-redux";

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none"
      }
    }
  },
  thumb: {
    width: 24,
    height: 25
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: "red",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {}
}))(Switch);

class SwitchButton extends React.Component {
  handleChange = () => {
    const { status, id, unPublishSite, publishSite } = this.props;
    status ? unPublishSite(id, false) : publishSite(id, true);
  };
  render() {
    const { status } = this.props;
    return (
      <FormControlLabel
        control={<IOSSwitch checked={status} onChange={this.handleChange} />}
        label={status ? "Publish" : "UnPublish"}
      />
    );
  }
}

const mapStateToProps = state => ({
  status: state.site.data[0].isPublish,
  id: state.site.data[0].id
});

const mapDispatchToProps = dispatch => ({
  publishSite: (id, isPublish) => dispatch(publishSite(id, isPublish)),
  unPublishSite: (id, isPublish) => dispatch(unPublishSite(id, isPublish))
});

export default connect(mapStateToProps, mapDispatchToProps)(SwitchButton);
