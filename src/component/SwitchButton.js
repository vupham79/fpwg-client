import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { connect } from "react-redux";
import { publishSite, unPublishSite } from "../actions";

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
  handlePublish = () => {
    const {
      siteId,
      isPublish,
      publishSite,
      unPublishSite,
      siteName
    } = this.props;
    if (isPublish) {
      unPublishSite({ siteId, siteName });
    } else {
      publishSite({ siteId, siteName });
    }
  };
  render() {
    const { style, disabled, onChange } = this.props;
    return (
      <FormControlLabel
        style={style}
        control={
          <IOSSwitch
            checked={this.props.isPublish}
            onChange={() => (onChange ? onChange : this.handlePublish())}
          />
        }
        label={this.props.isPublish ? "Publishing" : "Unpublishing"}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  publishSite: ({ siteId, siteName }) =>
    dispatch(publishSite({ siteId, siteName })),
  unPublishSite: ({ siteId, siteName }) =>
    dispatch(unPublishSite({ siteId, siteName }))
});

export default connect(null, mapDispatchToProps)(SwitchButton);
