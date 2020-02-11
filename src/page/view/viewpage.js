import React, { Component } from "react";
import { themes } from "../../constant/constant";

export default class ViewPage extends Component {
  render() {
    console.log(this.props.location.pathname);

    const data = {
      theme: "theme2"
    };
    return <></>;
  }
}
