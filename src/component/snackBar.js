import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import { connect } from "react-redux";
import { closeSnackBar } from "../actions";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SnackBar extends Component {
  handleClose = (event, reason) => {
    const { closeSnackBar } = this.props;
    if (reason === "clickaway") {
      return;
    }
    closeSnackBar();
  };
  render() {
    const { isOpen, message, closeSnackBar, typeAlert } = this.props;
    return (
      <Snackbar
        open={isOpen}
        onClose={this.handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={this.handleClose} severity={typeAlert}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

const mapStateToProps = state => ({
  isOpen: state.snackBar.isOpen,
  message: state.snackBar.message,
  typeAlert: state.snackBar.typeAlert
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar())
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
