import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import styles from "./index.module.css";
import { connect } from "react-redux";
import Link from "../../../component/link";
import { updateNavItemValue } from "../../../actions";

class Header extends Component {
  render() {
    const { siteEdit, isEdit, tabValue, updateNavItemValue } = this.props;
    const tabStyles = {
      textTransform: "none",
      fontFamily: siteEdit.fontTitle,
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

    const changeStyle = {
      fontFamily: siteEdit.fontTitle,
      color: siteEdit.color
    };

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
                  {siteEdit.navItems.map((item, index) => (
                    <Tab style={tabStyles} label={item.name} key={index} />
                  ))}
                </Tabs>
              ) : (
                siteEdit.navItems.map((item, index) => (
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
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
