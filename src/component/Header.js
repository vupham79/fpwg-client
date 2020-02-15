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
import Link from "../component/link";
import styles from "./index.module.css";

const imgUrl = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJZLvDxmOKEfBe-JfqgJ0WQhq808reFgcd0cpAQR1UGjPa6N_3",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
  "https://graph.facebook.com/100160931548695/picture?type=large"
];
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

  return (
    <>
      <Typography
        variant="body1"
        onClick={handleClick}
        className={styles.profile_content}
      >
        <img src={imgUrl[3]} alt="logo" className={styles.profile_img} />
        Dao Quang Thinh <br />
        (Owner)
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
          <Link to="/">
            <ListItemText primary="Log Out" onClick={() => props.setLogout()} />
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}

class CustomNavBarEditor extends React.Component {
  render() {
    const { imgUrl, setLogout } = this.props;
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
            <ProfileMenu setLogout={setLogout} />
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
  imgUrl: state.imageUrl.url
});

const mapDispatchToProps = dispatch => ({
  setLogout: () => dispatch(setLogout())
});
export default connect(mapStateToProps, mapDispatchToProps)(CustomNavBarEditor);
