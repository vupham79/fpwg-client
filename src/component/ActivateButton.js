import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import React from "react";
import { connect } from "react-redux";
import { activateUser, deactivateUser } from "../actions";

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

class ActivateButton extends React.Component {
  handleActivate = () => {
    const { userId, isActivated, activateUser, deactivateUser } = this.props;
    if (!isActivated) {
      activateUser({ userId });
    } else {
      deactivateUser({ userId });
    }
  };
  render() {
    return (
      <FormControlLabel
        control={
          <IOSSwitch
            checked={this.props.isActivated}
            onChange={() => this.handleActivate()}
          />
        }
        label={this.props.isActivated ? "Activated" : "Deactivated"}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  activateUser: ({ userId }) => dispatch(activateUser({ userId })),
  deactivateUser: ({ userId }) => dispatch(deactivateUser({ userId }))
});

export default connect(null, mapDispatchToProps)(ActivateButton);
