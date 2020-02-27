import { AppBar, Tab, Tabs, Container } from "@material-ui/core";
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

    const imgStyles = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "80%",
      paddingTop: "0.5rem"
    };

    return (
      <AppBar className={styles.app_bar} position="sticky">
        <Container>
          <Grid container alignItems="center">
            <Grid
              container
              item
              xs={12}
              sm={2}
              alignItems="center"
              justify="center"
            >
              <Grid item sm={7} xs={3}>
                <img
                  src={isEdit ? siteEdit.logo : siteView.logo}
                  style={imgStyles}
                  alt=""
                />
              </Grid>
              <Grid
                item
                sm={3}
                className={styles.shopName}
                style={isEdit ? titleEdit : titleView}
              >
                {isEdit
                  ? siteEdit && siteEdit.title
                  : siteView && siteView.title}
              </Grid>
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
                    {siteEdit.navItems.map((item, index) =>
                      item.isActive ? (
                        <Tab style={tabStyles} label={item.name} key={index} />
                      ) : null
                    )}
                  </Tabs>
                ) : (
                  siteView.navItems &&
                  siteView.navItems.map((item, index) =>
                    item.isActive ? (
                      <Grid item xs={2} sm={1} key={index}>
                        <Link
                          style={titleView}
                          to={`/${siteView.id}/${item.name}`}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                    ) : null
                  )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
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
