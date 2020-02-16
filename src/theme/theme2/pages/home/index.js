import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import { openLoading, closeLoading } from "../../../../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";

class PreHomePage extends Component {
  componentDidMount() {
    this.startTime();
  }

  startTime = () => {
    this.timer = setTimeout(() => {
      closeLoading();
    }, 4000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { openLoading, closeLoading, loading } = this.props;
    const progessStyles = {
      margin: "30vh 0vh"
    };
    openLoading();
    if (loading) {
      return (
        <Grid container justify="center">
          <CircularProgress color="primary" style={progessStyles} />
        </Grid>
      );
    } else {
      return <HomePage />;
    }
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
