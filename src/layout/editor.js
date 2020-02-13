import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import SiteBarEditor from "../component/SideBarEditor";
import CustomNavBarEditor from "../component/CustomNavBarEditor";

export default class componentName extends Component {
  render() {
    return (
      <>
        <CustomNavBarEditor />
        <Grid container>
          <Grid item md={3} xs={12}>
            <SiteBarEditor />
          </Grid>
          <Grid item md={9} xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </>
    );
  }
}
