import {
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
  withStyles,
  Button
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setLogout, setPreviewMode } from "../actions";
import { firebaseAppAuth } from "../utils/firebase";
import styles from "./index.module.css";
import Link from "./link";
import toastr from "./Toastr";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={1}
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
        <StyledMenuItem onClick={() => logout()}>Log Out</StyledMenuItem>
      </StyledMenu>
    </>
  );
}

class CustomNavBarEditor extends React.Component {

  handlePreview = body => {
    this.props.setPreviewMode(!this.props.isPreview);
  };

  logout = () => {
    const { setLogout } = this.props;
    firebaseAppAuth
      .signOut()
      .then(function () {
        setLogout();
        return <Redirect to="/" />;
      })
      .catch(function (error) {
        toastr.error(`Logout failed: ${error}`, "Error");
      });
  };

  render() {
    const { imgUrl, profile, isEdit, isPreview } = this.props;
    return (
      <Container maxWidth={"xl"} className={styles.header}>
        <Grid container item justify="space-between">
          <Grid container item sm={2} xs={12} md={2} alignItems="center">
            <Link to="/">
              <Grid container>
                <img style={imgStyles} src={imgUrl} alt="" />
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={styles.title}
                >
                  FPWG
                </Typography>
              </Grid>
            </Link>
          </Grid>
          <Grid
            container
            item
            sm={10}
            xs={6}
            alignItems="center"
            justify="flex-end"
          >
            {isEdit && (
              <Grid item sm={2} xs={12}>
                <Button
                  variant={"contained"}
                  color={isPreview ? "primary" : "default"}
                  onClick={() => this.handlePreview()}
                >
                  Preview
              </Button>
              </Grid>
            )}
            <Grid container item sm={2} xs={12}>
              <ProfileMenu profile={profile} logout={this.logout} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  imgUrl: state.imageUrl.url,
  profile: state.user.profile,
  isEdit: state.site.isEdit,
  isPreview: state.site.isPreview,
});

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(setLogout()),
  setPreviewMode: (bool) => dispatch(setPreviewMode(bool))
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBarEditor);
