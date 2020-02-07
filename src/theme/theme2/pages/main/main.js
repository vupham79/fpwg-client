import {
  faHeadphonesAlt,
  faQuestionCircle,
  faThLarge,
  faChartLine,
  faStoreAlt,
  faMoneyCheck,
  faEnvelopeOpenText,
  faEye,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Grid,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  withStyles
} from "@material-ui/core";
import React, { Component } from "react";
import styles from "./main.module.css";
import Link from "../../../../component/link";

const imgUrl = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJZLvDxmOKEfBe-JfqgJ0WQhq808reFgcd0cpAQR1UGjPa6N_3",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199",
  "https://graph.facebook.com/100160931548695/picture?type=large"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "85%",
  height: "100%"
};

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography
        variant="body1"
        onClick={handleClick}
        className={styles.support}
      >
        <FontAwesomeIcon
          className={styles.support_icon}
          icon={faHeadphonesAlt}
        />
        Support
      </Typography>
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
    </div>
  );
}

function WebsiteItem() {
  return (
    <Grid container justify="space-between" className={styles.web_item}>
      <Grid container item sm={7} alignItems="center">
        <Grid item sm={3} xs={2} className={styles.web_logo}>
          <img src={imgUrl[3]} alt="logo" style={imgStyles} />
        </Grid>
        <Grid item sm={9}>
          <Typography variant="h5" className={styles.web_content}>
            Foody
          </Typography>
          <Typography variant="body2" className={styles.web_content}>
            Food and Beverage (other)
          </Typography>
        </Grid>
      </Grid>
      <Grid container item sm={5} justify="flex-end">
        <Grid item>
          <Button className={styles.help_button}>
            View
            <FontAwesomeIcon className={styles.web_icon} icon={faEye} />
          </Button>
        </Grid>
        <Grid>
          <Link to="/edit">
            <Button className={styles.help_button}>
              Edit
              <FontAwesomeIcon icon={faCog} className={styles.web_icon} />
            </Button>
          </Link>
        </Grid>
        <Grid container item justify="flex-end" className={styles.on_button}>
          <Button className={styles.create_button}>On</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
          <ListItemText primary="Log Out" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default class MainPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid container item justify="space-between" className={styles.header}>
          <Grid container item sm={3} xs={3}>
            <Grid item sm={2} xs={6}>
              <img src={imgUrl[0]} style={imgStyles} alt="" />
            </Grid>
            <Grid item sm={2} xs={6}>
              <Typography
                variant="h5"
                color="textPrimary"
                className={styles.title}
              >
                Sites
              </Typography>
            </Grid>
          </Grid>
          <Grid container item sm={3} xs={6} alignItems="center">
            <Grid container item sm={6} xs={6} justify="flex-end">
              <CustomizedMenus />
            </Grid>
            <Grid container item sm={6} xs={6} justify="flex-end">
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
        <Grid container item>
          <Grid container item sm={2} xs={5} className={styles.navigation}>
            <Grid item sm={12}>
              <MenuList className={styles.menu_list}>
                <MenuItem>
                  <FontAwesomeIcon
                    className={styles.nav_icon}
                    icon={faThLarge}
                  />
                  <Typography variant="inherit">Sites</Typography>
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon
                    className={styles.nav_icon}
                    icon={faChartLine}
                  />
                  <Typography variant="inherit">Performance</Typography>
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon
                    className={styles.nav_icon}
                    icon={faStoreAlt}
                  />
                  <Typography variant="inherit">Ecommerce</Typography>
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon
                    className={styles.nav_icon}
                    icon={faMoneyCheck}
                  />
                  <Typography variant="inherit">Billing</Typography>
                </MenuItem>
                <MenuItem>
                  <FontAwesomeIcon
                    className={styles.nav_icon}
                    icon={faEnvelopeOpenText}
                  />
                  <Typography variant="inherit">Newsletter</Typography>
                </MenuItem>
              </MenuList>
            </Grid>
            <Grid item sm={2} xs={5} className={styles.profile}>
              <ProfileMenu />
            </Grid>
          </Grid>
          <Grid container item sm={10} xs={7} direction="column">
            <Grid
              container
              justify="space-between"
              item
              className={styles.current_edit}
            >
              <Grid container item sm={8}>
                <Grid
                  container
                  item
                  sm={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Typography variant="body1" className={styles.info_content}>
                    CURRENTLY EDITING
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  sm={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Grid item sm={3} xs={2}>
                    <img src={imgUrl[3]} alt="logo" style={imgStyles} />
                  </Grid>
                  <Grid item sm={1}>
                    <Typography variant="body1" className={styles.info_content}>
                      Foody
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  sm={4}
                  className={styles.info}
                  alignItems="center"
                >
                  <Typography variant="body1" className={styles.info_content}>
                    Last Logged in: 06-02-2020
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                sm={4}
                alignItems="center"
                justify="flex-end"
              >
                <Grid container item sm={4}>
                  <Button className={styles.manage_button}>Manage Site</Button>
                </Grid>
                <Grid container item sm={6}>
                  <Button className={styles.create_button}>
                    Create A New Site
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container item sm={6}>
                <WebsiteItem />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
