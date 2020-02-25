import React, { Component } from "react";
import HomePage from "./home";
import { connect } from "react-redux";

class PreHomePage extends Component {
  render() {
    const { loading } = this.props;
    return <>{!loading && <HomePage />}</>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PreHomePage);
