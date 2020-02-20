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
      siteId,
      themeFontTitle,
      themeColor,
      isEdit,
      tabValue,
      updateNavItemValue,
      navItems
    } = this.props;
    const tabStyles = {
      textTransform: "none",
      fontFamily: themeFontTitle,
      color: "#212121",
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
      fontFamily: themeFontTitle,
      color: themeColor
    };
    console.log(navItems);

    return (
      <AppBar className={styles.app_bar} style={changeStyle} position="sticky">
        <Grid container alignItems="center">
          <Grid item xs={12} sm={10}>
            <Grid container justify="flex-start">
              {isEdit ? (
                <Tabs
                  value={tabValue}
                  textColor="primary"
                  indicatorColor="primary"
                  centered
                  onChange={(e, newValue) => updateNavItemValue(newValue)}
                >
                  {navItems.map((item, index) => (
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
                    <Link className={styles.links} to={`/${siteId}/${item}`}>
                      {item}
                    </Link>
                  </Grid>
                ))
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2}>
            <p className={styles.shopName} style={changeStyle}>
              Page Name
            </p>
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  tabValue: state.tab.navItemValue,
  isEdit: state.user.isEdit,
  themeFontTitle: state.theme.fontTitle,
  themeColor: state.theme.color,
  navItems: state.theme.navItems
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
