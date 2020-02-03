import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import styles from "./index.module.css";

export default class link extends Component {
  render() {
    const { to } = this.props;

    return (
      <BrowserRouter>
        <Link className={styles.links} to={to}>
          {this.props.children}
        </Link>
      </BrowserRouter>
    );
  }
}
