import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default class link extends Component {
  render() {
    const { to, style } = this.props;

    return (
      <Link className={styles.links} to={to} style={style}>
        {this.props.children}
      </Link>
    );
  }
}
