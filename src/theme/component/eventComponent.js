import { Divider, Grid } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import styles from "./event.module.css";

class EventComponent extends React.Component {
  render() {
    const {
      isEdit,
      siteEdit,
      siteView,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView
    } = this.props;

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
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "center",
        fontSize: 16
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10
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
      eventPage: {
        marginTop: "5vh",
        marginBottom: "5vh",
        backgroundColor: "#1a1919"
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
            // className={classes.eventPage}
          >
            <Grid
              item
              sm={6}
              xs={10}
              container
              justify="center"
              className={styles.event_body}
            >
              {isEdit && !siteEdit.events && (
                <Grid className={styles.event}>
                  <p style={classes.changableBody}>No event.</p>
                </Grid>
              )}
              {!isEdit && !siteView.events && (
                <Grid className={styles.event}>
                  <p style={classes.changableBody}>No event.</p>
                </Grid>
              )}
              {isEdit && siteEdit.events && (
                <Grid container item>
                  <Grid item xs={12}>
                    <p style={classes.changableBody2}>Upcoming Events</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider color="#212121" />
                  </Grid>
                </Grid>
              )}
              {!isEdit && siteView.events && (
                <Grid container item>
                  <Grid item xs={12}>
                    <p style={classes.changableBody2}>Upcoming Events</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider color="#212121" />
                  </Grid>
                </Grid>
              )}
              {isEdit &&
                siteEdit.events &&
                siteEdit.events.filter(
                  row =>
                    !row.isCancelled && moment(row.endTime).isAfter(moment())
                ).length === 0 && (
                  <Grid className={styles.event}>
                    <p style={classes.changableBody}>No upcoming event.</p>
                  </Grid>
                )}

              {!isEdit &&
                siteView.events &&
                siteView.events.filter(
                  row =>
                    !row.isCancelled && moment(row.endTime).isAfter(moment())
                ).length === 0 && (
                  <Grid className={styles.event}>
                    <p style={classes.changableBody}>No upcoming event.</p>
                  </Grid>
                )}

              {isEdit &&
                siteEdit.events &&
                siteEdit.events.map((row, index) => {
                  return (
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment()) && (
                      <Grid
                        item
                        container
                        sm={12}
                        className={styles.contain_event}
                        key={index}
                        style={{ marginTop: 10, backgroundColor: "white" }}
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
                            <a
                              href={"https://" + row.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {row.name}
                            </a>
                          </Grid>
                          <Grid item xs={12} style={{ color: "#3578e5" }}>
                            {moment(row.startTime).format("MMMM DD")}
                            {row.endTime &&
                              !moment(
                                moment(row.endTime).format("MMMM DD")
                              ).isSame(
                                moment(row.startTime).format("MMMM DD")
                              ) &&
                              " - " + moment(row.endTime).format("MMMM DD")}
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
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              display: "inline-block"
                            }}
                          >
                            {row.place.city}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  );
                })}
              {!isEdit &&
                siteView.events &&
                siteView.events.map((row, index) => {
                  return (
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment()) && (
                      <Grid
                        item
                        container
                        sm={12}
                        className={styles.contain_event}
                        key={index}
                        style={{ marginTop: 10, backgroundColor: "white" }}
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
                            <a
                              href={"https://" + row.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {row.name}
                            </a>
                          </Grid>
                          <Grid item xs={12} style={{ color: "#3578e5" }}>
                            {moment(row.startTime).format("MMMM DD")}
                            {row.endTime &&
                              !moment(
                                moment(row.endTime).format("MMMM DD")
                              ).isSame(
                                moment(row.startTime).format("MMMM DD")
                              ) &&
                              " - " + moment(row.endTime).format("MMMM DD")}
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
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              display: "inline-block"
                            }}
                          >
                            {row.place.city}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  );
                })}
              <Grid item xs={12}>
                <Divider color="#212121" />
              </Grid>
              {isEdit && siteEdit.events && (
                <Grid container item>
                  <Grid item xs={12}>
                    <p style={classes.changableBody2}>Past Events</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider color="#212121" />
                  </Grid>
                </Grid>
              )}
              {!isEdit && siteView.events && (
                <Grid container item>
                  <Grid item xs={12}>
                    <p style={classes.changableBody2}>Past Events</p>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider color="#212121" />
                  </Grid>
                </Grid>
              )}
              {isEdit &&
                siteEdit.events &&
                siteEdit.events.filter(
                  row =>
                    row.isCancelled ||
                    moment(row.endTime).isSameOrBefore(moment()) ||
                    !row.endTime
                ).length === 0 && (
                  <Grid className={styles.event}>
                    <p style={classes.changableBody}>No past event.</p>
                  </Grid>
                )}

              {!isEdit &&
                siteView.events &&
                siteView.events.filter(
                  row =>
                    row.isCancelled ||
                    moment(row.endTime).isSameOrBefore(moment()) ||
                    !row.endTime
                ).length === 0 && (
                  <Grid className={styles.event}>
                    <p style={classes.changableBody}>No past event.</p>
                  </Grid>
                )}

              {isEdit &&
                siteEdit.events &&
                siteEdit.events.map((row, index) => {
                  return (
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime) && (
                      <Grid
                        item
                        container
                        sm={12}
                        className={styles.contain_event}
                        key={index}
                        style={{ marginTop: 10, backgroundColor: "white" }}
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
                            <a
                              href={"https://" + row.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {row.name}
                            </a>
                          </Grid>
                          <Grid item xs={12} style={{ color: "#3578e5" }}>
                            {moment(row.startTime).format("MMMM DD")}
                            {row.endTime &&
                              !moment(
                                moment(row.endTime).format("MMMM DD")
                              ).isSame(
                                moment(row.startTime).format("MMMM DD")
                              ) &&
                              " - " + moment(row.endTime).format("MMMM DD")}
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
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              display: "inline-block"
                            }}
                          >
                            {row.place.city}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  );
                })}
              {!isEdit &&
                siteView.events &&
                siteView.events.map((row, index) => {
                  console.log(row);
                  return (
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime) && (
                      <Grid
                        item
                        container
                        sm={12}
                        className={styles.contain_event}
                        key={index}
                        style={{ marginTop: 10, backgroundColor: "white" }}
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
                            <a
                              href={"https://" + row.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {row.name}
                            </a>
                          </Grid>
                          <Grid item xs={12} style={{ color: "#3578e5" }}>
                            {moment(row.startTime).format("MMMM DD")}
                            {row.endTime &&
                              !moment(
                                moment(row.endTime).format("MMMM DD")
                              ).isSame(
                                moment(row.startTime).format("MMMM DD")
                              ) &&
                              " - " + moment(row.endTime).format("MMMM DD")}
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
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              display: "inline-block"
                            }}
                          >
                            {row.place.city}
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  );
                })}
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
