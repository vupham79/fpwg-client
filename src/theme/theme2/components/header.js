import { AppBar, Tab, Tabs } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue } from "../../../actions";
import Link from "../../../component/link";
import styles from "./index.module.css";

class Header extends Component {
  render() {
    const {
      isEdit,
      tabValue,
      updateNavItemValue,
      siteEdit,
      siteView,
      titleEdit,
      titleView
    } = this.props;
    const tabStyles = {
      textTransform: "none",
      fontFamily: siteEdit.fontTitle,
      color: siteEdit.color,
      minWidth: "3vh",
      "&:hover": {
        color: "#40a9ff",
        opacity: 1
      },
      "&$selected": {
        color: "#1890ff"
      },
      "&:focus": {
        color: "#40a9ff"
      }
    };

    return (
      <AppBar className={styles.app_bar} position="sticky">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={2}>
            <p
              className={styles.shopName}
              style={isEdit ? titleEdit : titleView}
            >
              {siteView && siteView.data.title}
            </p>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container justify="flex-end">
              {isEdit ? (
                <>
                  <Tabs
                    value={tabValue}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={(e, newValue) => updateNavItemValue(newValue)}
                  >
                    {siteEdit.data.navItems.map((item, index) => (
                      <Tab
                        style={titleEdit && tabStyles}
                        label={item.name}
                        key={index}
                      />
                    ))}
                  </Tabs>
                </>
              ) : (
                siteView.data.navItems &&
                siteView.data.navItems.map((item, index) => (
                  <Grid item xs={2} sm={1} key={index} style={titleView}>
                    <Link to={`/${siteView.data.id}/${item.name}`}>
                      {item.name}
                    </Link>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  tabValue: state.tab.navItemValue,
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
