import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "../../../../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

class PreHomePage extends Component {
  componentDidMount() {
    this.props.openLoading();
  }

  startTime = () => {
    setTimeout(this.props.closeLoading, 2000);
  };

  render() {
    const { loading } = this.props;
    const progessStyles = {
      margin: "30vh 0vh"
    };
    this.startTime();
    return (
      <>
        {loading && (
          <Grid container justify="center">
            <CircularProgress color="primary" style={progessStyles} />
          </Grid>
        )}
        {!loading && <HomePage />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.theme.loading
});

const mapDispatchToProps = dispatch => ({
  openLoading: () => dispatch(openLoading()),
  closeLoading: () => dispatch(closeLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
