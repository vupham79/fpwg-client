import {
  AppBar,
  Button,
  Container,
  Grid,
  Tab,
  Tabs,
  Tooltip,
  Zoom
} from "@material-ui/core";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateNavItemValue } from "../../../actions";
import Link from "../../../component/link";
import styles from "./index.module.css";
class Header extends Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return `url('${URL.createObjectURL(newLogo)}'`;
      } else return `url('${siteEdit.logo}')`;
    }
    return `url('${siteView.logo}')`;
  };
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
        {siteEdit.navItems.map((item, index) =>
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
    const imgStyles = {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "5rem"
    };
    return (
      <AppBar className={styles.app_bar} position="sticky">
        <Container>
          <Grid container alignItems="center">
            <Grid
              container
              item
              xs={12}
              sm={4}
              alignItems="center"
              justify="center"
            >
              <Grid
                id={"siteLogo"}
                item
                sm={2}
                xs={3}
                style={{
                  ...imgStyles,
                  backgroundImage: this.renderImage()
                }}
              />
              <Grid
                item
                sm={8}
                className={styles.shopName}
                style={isEdit ? titleEdit : titleView}
              >
                {isEdit
                  ? siteEdit && siteEdit.title
                  : siteView && siteView.title}
              </Grid>
              <Grid>
                {!navItemIsActive && (
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
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container justify="flex-end">
                {isEdit
                  ? this.renderTabItems()
                  : siteView.navItems &&
                    siteView.navItems.map((item, index) =>
                      item.isActive ? (
                        <Grid item xs={2} sm={2} md={1} key={index}>
                          <Link
                            style={titleView}
                            to={`/${siteView.sitePath}/${item.name}`}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                      ) : null
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
  titleView: state.site.titleView,
  navItemIsActive: state.site.navItemIsActive,
  newLogo: state.site.newLogo
});

const mapDispatchToProps = dispatch => ({
  updateNavItemValue: value => dispatch(updateNavItemValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
