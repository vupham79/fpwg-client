import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import styles from "./index.module.css";
import { connect } from "react-redux";
import Link from "../../../component/link";
import { updateNavItemValue } from "../../../actions";

class Header extends Component {
  render() {
    const { isEdit, tabValue, updateNavItemValue, siteEdit } = this.props;
    console.log(siteEdit.color);
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

    // const currentPage = "";

    const changeStyle = {
      fontFamily: siteEdit.fontTitle,
      color: siteEdit.color
    };

    const navItems = siteEdit.navItems;

    return (
      <AppBar className={styles.app_bar} position="sticky">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={2}>
            <p className={styles.shopName} style={changeStyle}>
              Foody
            </p>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid container justify="flex-end">
              {isEdit ? (
                <Tabs
                  value={tabValue}
                  textColor="primary"
                  indicatorColor="primary"
                  onChange={(e, newValue) => updateNavItemValue(newValue)}
                >
                  {navItems
                    // .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((item, index) => (
                      <Tab style={tabStyles} label={item.name} key={index} />
                    ))}
                </Tabs>
              ) : (
                navItems.map((item, index) => (
                  <Grid
                    className={styles.nav_item}
                    item
                    xs={2}
                    sm={1}
                    key={index}
                  >
                    <Link
                      className={styles.links}
                      to={`/${siteEdit.id}/${item}`}
                    >
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
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
