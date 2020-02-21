import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";
import { showLoading, closeLoading } from "../../../../actions";
import Spinner from "../../../../component/Spinner";

class PreHomePage extends Component {
  componentDidMount() {
    this.props.showLoading();
  }

  startTime = () => {
    setTimeout(this.props.closeLoading, 2000);
  };

  render() {
    const { loading } = this.props;
    this.startTime();

    return (
      <>
        <Spinner />
        {!loading && <HomePage />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.spinner.loading
});

const mapDispatchToProps = dispatch => ({
  showLoading: () => dispatch(showLoading()),
  closeLoading: () => dispatch(closeLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
