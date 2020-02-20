import {
  faHeadphonesAlt,
  faQuestionCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  withStyles
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { setLogout } from "../actions";
import styles from "./index.module.css";
import { firebaseAppAuth } from "../utils/firebase";
import { Redirect } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {}
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "25%",
  marginRight: "0.5rem",
  marginLeft: "0.5rem"
};

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.black
      }
    }
  }
}))(MenuItem);

function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className={styles.help_button}>
        <FontAwesomeIcon
          className={styles.support_icon}
          icon={faHeadphonesAlt}
        />
        Support
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Resource Center" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText primary="Message Us" />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

function ProfileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { profile, logout } = props;
  return (
    <>
      <Typography
        variant="body1"
        onClick={handleClick}
        className={styles.profile_content}
      >
        <img
          src={profile && profile.picture && profile.picture.data.url}
          alt="logo"
          className={styles.profile_img}
        />
        {profile && profile.name}
      </Typography>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Message Us" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemText
            primary="Log Out"
            onClick={() => {
              logout();
            }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

class CustomNavBarEditor extends React.Component {
  logout = () => {
    const { setLogout } = this.props;
    firebaseAppAuth
      .signOut()
      .then(function () {
        setLogout();
        return <Redirect to="/" />;
      })
      .catch(function (error) {
        console.log("Logout: ", error);
      });
  };

  render() {
    const { imgUrl, profile } = this.props;
    return (
      <Grid container item justify="space-between" className={styles.header}>
        <Grid container item sm={2} xs={12} md={2} alignItems="center">
          <img style={imgStyles} src={imgUrl} alt="" />
          <Typography variant="h5" color="textPrimary" className={styles.title}>
            FPWG
          </Typography>
        </Grid>
        <Grid
          container
          item
          sm={10}
          xs={6}
          alignItems="center"
          justify="flex-end"
        >
          <Grid container item sm={2} xs={12}>
            <ProfileMenu profile={profile} logout={this.logout} />
          </Grid>
          <Grid container item sm={1} xs={6} justify="flex-end">
            <CustomizedMenus />
          </Grid>
          <Grid container item sm={1} xs={6} justify="flex-end">
            <Button className={styles.help_button}>
              <FontAwesomeIcon
                className={styles.help_icon}
                icon={faQuestionCircle}
              />
              Help
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  imgUrl: state.imageUrl.url,
  profile: state.user.profile
});

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(setLogout())
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBarEditor);
