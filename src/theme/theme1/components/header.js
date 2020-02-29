import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import styles from "./index.module.css";
import { connect } from "react-redux";
import Link from "../../../component/link";
import { updateNavItemValue } from "../../../actions";

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
      fontFamily: titleEdit.fontFamily,
      color: titleEdit.color,
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
          <Grid item xs={12} sm={10}>
            <Grid container justify="flex-start">
              {isEdit ? (
                <Tabs
                  value={tabValue}
                  textColor="primary"
                  indicatorColor="primary"
                  onChange={(e, newValue) => updateNavItemValue(newValue)}
                >
                  {siteEdit.navItems &&
                    siteEdit.navItems.map((item, index) =>
                      item.isActive ? (
                        <Tab style={tabStyles} label={item.name} key={index} />
                      ) : null
                    )}
                </Tabs>
              ) : (
                siteView.navItems &&
                siteEdit.navItems.map((item, index) =>
                  item.isActive ? (
                    <Grid
                      className={styles.nav_item}
                      item
                      xs={2}
                      sm={1}
                      key={index}
                    >
                      <Link
                        className={styles.links}
                        style={titleView}
                        to={`/${siteEdit.id}/${item.name}`}
                      >
                        {item}
                      </Link>
                    </Grid>
                  ) : null
                )
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2}>
            <p
              className={styles.shopName}
              style={isEdit ? titleEdit : titleView}
            >
              {isEdit ? siteEdit && siteEdit.title : siteView && siteView.title}
            </p>
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
