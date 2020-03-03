import { AppBar, Tab, Tabs, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue } from "../../../actions";
import Link from "../../../component/link";
import styles from "./index.module.css";

class Header extends Component {
  renderTabItems = () => {
    const { tabValue, updateNavItemValue, siteEdit, titleEdit } = this.props;
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
    if (tabValue) {
      return (
        <Tabs
          value={tabValue}
          textColor="primary"
          TabIndicatorProps={{
            style: { background: siteEdit.color }
          }}
          onChange={(e, newValue) => updateNavItemValue(newValue)}
        >
          {siteEdit.navItems.map((item, index) =>
            item.isActive ? (
              <Tab style={tabStyles} label={item.name} key={index} />
            ) : null
          )}
        </Tabs>
      );
    }
  };

  render() {
    const { isEdit, siteEdit, siteView, titleEdit, titleView } = this.props;

    const tabStylesView = {
      textTransform: "none",
      fontFamily: titleView.fontFamily,
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

    return (
      <AppBar className={styles.app_bar} position="sticky">
        <Container>
          <Grid container alignItems="center">
            <Grid item xs={8}>
              <Grid container justify="flex-start">
                {isEdit
                  ? this.renderTabItems()
                  : siteView.navItems &&
                    siteView.navItems.map((item, index) =>
                      item.isActive ? (
                        <Grid item xs={2} sm={1} key={index}>
                          <Link
                            style={tabStylesView}
                            to={`/${siteView.id}/${item.name}`}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                      ) : null
                    )}
              </Grid>
            </Grid>
            <Grid item container xs={4} alignItems="center" justify="center">
              <Grid
                item
                className={styles.shopName}
                style={isEdit ? titleEdit : titleView}
              >
                {isEdit
                  ? siteEdit && siteEdit.title
                  : siteView && siteView.title}
              </Grid>
            </Grid>
            <div style={{ height: "10vh" }} />
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
