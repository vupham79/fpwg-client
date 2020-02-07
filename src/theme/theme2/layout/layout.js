import React, { Component } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PreHomePage from "../pages/home";

export default class Layout extends Component {
  render() {
    return (
      <>
        {/* <Header /> */}
        <PreHomePage />
        <Footer />
      </>
    );
  }
}
