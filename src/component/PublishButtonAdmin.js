import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { connect } from "react-redux";
import { publishSiteAdmin, unPublishSiteAdmin } from "../actions";

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
      publishSiteAdmin,
      unPublishSiteAdmin,
      siteName
    } = this.props;
    if (isPublish) {
      unPublishSiteAdmin({ siteId, siteName });
    } else {
      publishSiteAdmin({ siteId, siteName });
    }
  };
  render() {
    return (
      <FormControlLabel
        control={
          <IOSSwitch
            checked={this.props.isPublish}
            disabled
          // onChange={() => this.handlePublish()}
          />
        }
        label={this.props.isPublish ? "Publishing" : "Unpublishing"}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  publishSiteAdmin: ({ siteId, siteName }) =>
    dispatch(publishSiteAdmin({ siteId, siteName })),
  unPublishSiteAdmin: ({ siteId, siteName }) =>
    dispatch(unPublishSiteAdmin({ siteId, siteName }))
});

export default connect(null, mapDispatchToProps)(SwitchButton);
