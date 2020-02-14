import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SiteBarEditor from "../component/SideBarEditor";
import Header from "../component/Header";

export default class componentName extends Component {
  render() {
    return (
      <>
        <Header />
        <Grid container>
          <Grid item sm={3} xs={12}>
            <SiteBarEditor />
          </Grid>
          <Grid item sm={9} xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </>
    );
  }
}
