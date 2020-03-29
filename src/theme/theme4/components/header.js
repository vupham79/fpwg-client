import {
  AppBar,
  Tab,
  Tabs,
  Container,
  Tooltip,
  Zoom,
  Button
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue } from "../../../actions";
import Link from "../../../component/link";
import styles from "./index.module.css";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    return (
      <Tabs
        value={tabValue}
        textColor="primary"
        TabIndicatorProps={{
          style: { background: siteEdit.color }
        }}
        onChange={(e, newValue) => updateNavItemValue(newValue)}
      >
        {siteEdit.navItems &&
          siteEdit.navItems.map((item, index) =>
            item.isActive ? (
              <Tab style={tabStyles} label={item.name} key={index} />
            ) : null
          )}
      </Tabs>
    );
  };

  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      navItemIsActive
    } = this.props;

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
          <Grid container xs={12} direction="row" justify="center">
            <Grid item xs={1}>
              {!isEdit && !navItemIsActive && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title="This page is currently inactive"
                >
                  <Button>
                    <FontAwesomeIcon color={"orange"} icon={faExclamation} />
                  </Button>
                </Tooltip>
              )}
            </Grid>
            <Grid item xs={11}>
              {isEdit
                ? this.renderTabItems()
                : siteView.navItems &&
                  siteView.navItems.map((item, index) =>
                    item.isActive ? (
                      <Grid item xs={2} sm={1} key={index}>
                        <Link
                          style={tabStylesView}
                          to={`/${siteView.sitePath}/${item.name}`}
                        >
                          {item.name}
                        </Link>
                      </Grid>
                    ) : null
                  )}
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
  titleView: state.site.titleView,
  navItemIsActive: state.site.navItemIsActive
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
