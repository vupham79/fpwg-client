import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import styles from "./index.module.css";

class NotFound extends Component {
  render() {
    return (
      <div>
        <Typography
          className={styles.title}
          variant="h4"
          align="center"
          gutterBottom
        >
          404 Page Not Found
        </Typography>
      </div>
    );
  }
}

export default NotFound;
