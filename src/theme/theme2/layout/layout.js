import React, { Component } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import PreHomePage from "../pages/home";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        {/* {this.props.children} */}
        <PreHomePage/>
        <Footer />
      </>
    );
  }
}
