import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SiteBarEditor from "../component/SideBarEditor";
import CustomNavBarEditor from "../component/CustomNavBarEditor";

export default class componentName extends Component {
  render() {
    return (
      <Grid container>
        <Grid item md={12} xs={12}>
          <CustomNavBarEditor />
        </Grid>
        <Grid container item xs={12}>
          <Grid item md={3} xs={4}>
            <SiteBarEditor />
          </Grid>
          <Grid item md={9} xs={8}>
            {this.props.children}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
