import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

export default class Layout extends Component {
  render() {
    // console.log("helllooo");
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}
