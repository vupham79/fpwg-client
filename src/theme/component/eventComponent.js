import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import styles from "./event.module.css";

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

class EventComponent extends React.Component {
  render() {
    const { isEdit, siteEdit, siteView, titleEdit, titleView } = this.props;

    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20
      },
      changableBody: {
        fontFamily: siteEdit.fontBody,
        color: "#212121",
        textAlign: "center",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: siteEdit.fontBody,
        color: "#212121",
        textAlign: "left",
        fontSize: 16
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 15
      },
      changableFirst2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 30
      },
      changableLegend: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
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
        backgroundColor: "white",
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
                    <img
                      src={isEdit ? siteEdit.logo : siteView.logo}
                      alt="./images/theme1-banner3.jpg"
                      style={imgStyles}
                    />
                  </div>
                </Grid>
                <Grid item sm={9} container direction="column">
                  <Grid>
                    <Typography variant="h6" style={classes.changableName}>
                      {isEdit ? siteEdit.title : siteView.title}
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
              {isEdit && !siteEdit.events && (
                <Grid className={styles.event}>
                  <Typography className={styles.event_content}>
                    No upcoming event.
                  </Typography>
                </Grid>
              )}
              {!isEdit && !siteView.events && (
                <Grid className={styles.event}>
                  <Typography className={styles.event_content}>
                    No upcoming event.
                  </Typography>
                </Grid>
              )}
              {isEdit &&
                siteEdit.events &&
                siteEdit.events.map(row => (
                  <Grid
                    item
                    container
                    sm={12}
                    className={styles.contain_event}
                    key={row.id}
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      container
                      direction="row"
                      item
                      xs={2}
                      style={{ height: "5rem" }}
                    >
                      <Grid item xs={12} style={classes.changableFirst}>
                        {moment(row.startTime)
                          .format("MMM")
                          .toUpperCase()}
                      </Grid>
                      <Grid item xs={12} style={classes.changableFirst2}>
                        {moment(row.startTime).format("D") + " "}
                      </Grid>
                    </Grid>

                    <Grid container direction="row" item xs={4}>
                      <Grid item xs={12} style={{ fontWeight: "bold" }}>
                        <a href={"https://" + row.url} target="_blank">
                          {" "}
                          {row.name}
                        </a>
                      </Grid>
                      <Grid item xs={12} style={{ color: "#3578e5" }}>
                        {moment(row.startTime).format("MMMM DD")} -{" "}
                        {moment(row.endTime).format("MMMM DD")}
                      </Grid>
                    </Grid>

                    <Grid container direction="row" item xs={6}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          display: "inline-block"
                        }}
                      >
                        {row.place.name}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        style={{
                          color: "#90949c",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          display: "inline-block"
                        }}
                      >
                        {row.place.city}
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider
                        color="#212121"
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />
                    </Grid>
                  </Grid>
                ))}
              {!isEdit &&
                siteView.events &&
                siteView.events.map(row => (
                  <Grid
                    item
                    container
                    sm={12}
                    className={styles.contain_event}
                    key={row.id}
                    style={{ marginTop: 10 }}
                  >
                    <Grid
                      container
                      direction="row"
                      item
                      xs={2}
                      style={{ height: "5rem" }}
                    >
                      <Grid item xs={12} style={classes.changableFirst}>
                        {moment(row.startTime)
                          .format("MMM")
                          .toUpperCase()}
                      </Grid>
                      <Grid item xs={12} style={classes.changableFirst2}>
                        {moment(row.startTime).format("D") + " "}
                      </Grid>

                      <Grid container direction="row" item xs={4}>
                        <Grid item xs={12} style={{ fontWeight: "bold" }}>
                          {row.name}
                        </Grid>
                        <Grid item xs={12} style={{ color: "#3578e5" }}>
                          {moment(row.startTime).format("MMMM DD")} -{" "}
                          {moment(row.endTime).format("MMMM DD")}
                        </Grid>
                      </Grid>

                      <Grid container direction="row" item xs={6}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "inline-block"
                          }}
                        >
                          {row.place.name}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={{
                            color: "#90949c",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "inline-block"
                          }}
                        >
                          {row.place.city}
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider
                          color="#212121"
                          style={{ marginLeft: 10, marginRight: 10 }}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider
                        color="#212121"
                        style={{ marginLeft: 10, marginRight: 10 }}
                      />
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  siteView: state.site.siteView,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView
});

export default connect(mapStateToProps, null)(EventComponent);
