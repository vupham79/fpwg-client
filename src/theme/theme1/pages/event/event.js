import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import styles from "./event.module.css";

const imgUrl = [
  "https://scontent.xx.fbcdn.net/v/t1.0-9/83821452_100161464881975_9179838828163104768_n.jpg?_nc_cat=109&_nc_ohc=kZko6mqBMCIAX_ZyGAD&_nc_ht=scontent.xx&oh=556f1405040ff8e685037787552b4af6&oe=5E95740E",
  "https://scontent.xx.fbcdn.net/v/t1.0-9/84357702_100161708215284_6628528314745094144_n.jpg?_nc_cat=111&_nc_ohc=j0bhRaMn6QIAX-D2JrZ&_nc_ht=scontent.xx&oh=00c77acfe89ec5953a9b1689b85308cb&oe=5EDA3199"
];

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

class Theme1Event extends React.Component {
  render() {
    const { themeFontTitle, themeFontBody, themeColor } = this.props;

    const useStyles = theme => ({
      changableTitle: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: themeColor,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "center",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: themeFontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      pageName: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        textDecoration: "underline",
        textDecorationColor: themeColor
      },
      changableLegend: {
        fontFamily: themeFontTitle,
        fontWeight: "bold",
        color: "white",
        zIndex: 5,
        position: "absolute",
        top: "50%",
        left: "40%",
        fontSize: 80,
        textAlign: "center"
      },
      greyDiv: {
        backgroundColor: "#e1ede4",
        padding: 30,
        textAlign: "center",
        color: "#535353",
        fontSize: 20
      },
      centerItem: {
        display: "block",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 50
      },
      centerItem2: {
        display: "block",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        width: 400,
        marginLeft: "auto",
        marginRight: "auto"
      },
      changableAppBar: {
        backgroundColor: "white",
        opacity: 0.6,
        position: "sticky",
        color: "#535353",
        textAlign: "right"
      }
    });
    const classes = useStyles();

    return (
      <Grid container>
        <Grid item xs={12}>
          <p style={classes.changableTitle}>
            <span style={classes.changableFirst}>E</span>VENTS
          </p>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            direction="column"
            className={styles.event_page}
          >
            <Grid
              item
              sm={3}
              xs={3}
              container
              justify="center"
              className={styles.event_body}
            >
              <Grid item sm={12} container>
                <Grid item sm={3}>
                  <div className={styles.image_page}>
                    <img alt="" src={imgUrl[1]} style={imgStyles} />
                  </div>
                </Grid>
                <Grid item sm={9} container direction="column">
                  <Grid>
                    <Typography variant="h6" style={classes.changableName}>
                      Page name
                    </Typography>
                  </Grid>
                  <Grid>
                    <Button className={styles.btn_like}>
                      <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className={styles.icon}
                        size-={2}
                      ></FontAwesomeIcon>
                      <Typography className={styles.like}>Like Page</Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container sm={12} className={styles.contain_event}>
                <Grid className={styles.event}>
                  <Typography className={styles.event_content}>
                    Page name does not have any upcoming event.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  themeFontTitle: state.theme.fontTitle,
  themeColor: state.theme.color,
  themeFontBody: state.theme.fontBody
});

export default connect(mapStateToProps, null)(Theme1Event);
