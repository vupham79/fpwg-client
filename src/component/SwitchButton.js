import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
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
    height: 24
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  checked: {}
}))(Switch);

class SwitchButton extends React.Component {
  handlePublish = () => {
    const { siteId, isPublish, publishSite, unPublishSite } = this.props;
    if (isPublish) {
      unPublishSite(siteId);
    } else {
      publishSite(siteId);
    }
  };

  render() {
    const { isPublish } = this.props;
    return (
      <FormControlLabel
        control={
          <IOSSwitch
            checked={isPublish}
            onChange={() => this.handlePublish()}
          />
        }
        label={isPublish ? "Publishing" : "Unpublishing"}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  publishSite: siteId => dispatch(publishSite(siteId)),
  unPublishSite: siteId => dispatch(unPublishSite(siteId))
});

export default connect(null, mapDispatchToProps)(SwitchButton);
