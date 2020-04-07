import { Divider, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getDataByPageNumber, setEventsToSiteView } from "../../actions";
import styles from "./event.module.css";
class EventComponent extends React.Component {
  state = {
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.itemPerPage,
    page: 1,
  };

  handlePageViewClick = async (event, newValue) => {
    const {
      siteInfo,
      getDataByPageNumber,
      isEdit,
      setEventsToSiteView,
    } = this.props;
    if (!isEdit) {
      this.setState({ pageView: newValue });
      const data = await getDataByPageNumber({
        sitePath: siteInfo,
        page: "event",
        pageNumber: newValue,
      });
      data && setEventsToSiteView(data);
    }
  };
  handlePageEditClick = (event, newValue) => {
    let selected = newValue - 1;
    let offset = Math.ceil(selected * this.state.itemPerPage);
    this.setState({ offset: offset, page: newValue });
  };

  renderUpComingEvent = (homeList, classes) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteEdit,
      siteView,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              !row.isCancelled &&
              moment(row.endTime).isAfter(moment()) && (
                <Grid
                  item
                  container
                  sm={12}
                  className={styles.contain_event}
                  key={index}
                  style={{ padding: 10, backgroundColor: "white" }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showCoverEvent
                        ? "block"
                        : "none",
                      backgroundColor: "#444950",
                    }}
                  >
                    <img
                      style={{
                        // objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      src={row.cover}
                      alt=""
                    />
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{ height: "5rem" }}
                  >
                    <Grid item xs={12} style={classes.changableFirst}>
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid item xs={12} style={classes.changableFirst2}>
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid container direction="row" item xs={2}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                      }}
                    >
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
                        !moment(moment(row.endTime).format("MMMM DD")).isSame(
                          moment(row.startTime).format("MMMM DD")
                        ) &&
                        " - " + moment(row.endTime).format("MMMM DD")}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: isEdit
                        ? siteEdit.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDesEvent
                        ? "block"
                        : "none",
                      height: "6em",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                    }}
                  >
                    {row.description}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={3}
                    style={{
                      display: isEdit
                        ? siteEdit.showPlaceEvent
                          ? "block"
                          : "none"
                        : siteView.showPlaceEvent
                        ? "block"
                        : "none",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                      }}
                    >
                      {row.place && row.place.name}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                      }}
                    >
                      {row.place && row.place.city}
                    </Grid>
                  </Grid>
                </Grid>
              )
            );
          })}
      </>
    );
  };

  renderPassEvent = (homeList, classes) => {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      siteEdit,
      siteView,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              (row.isCancelled ||
                moment(row.endTime).isSameOrBefore(moment()) ||
                !row.endTime) && (
                <Grid
                  item
                  container
                  sm={12}
                  className={styles.contain_event}
                  key={index}
                  style={{ padding: 10, backgroundColor: "white" }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showCoverEvent
                        ? "block"
                        : "none",
                      backgroundColor: "#444950",
                    }}
                  >
                    <img
                      style={{
                        // objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      src={row.cover}
                      alt=""
                    />
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{ height: "5rem" }}
                  >
                    <Grid item xs={12} style={classes.changableFirst}>
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid item xs={12} style={classes.changableFirst2}>
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid container direction="row" item xs={2}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                      }}
                    >
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
                        !moment(moment(row.endTime).format("MMMM DD")).isSame(
                          moment(row.startTime).format("MMMM DD")
                        ) &&
                        " - " + moment(row.endTime).format("MMMM DD")}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: isEdit
                        ? siteEdit.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDesEvent
                        ? "block"
                        : "none",
                      height: "6em",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                    }}
                  >
                    {row.description}
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={3}
                    style={{
                      display: isEdit
                        ? siteEdit.showPlaceEvent
                          ? "block"
                          : "none"
                        : siteView.showPlaceEvent
                        ? "block"
                        : "none",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                      }}
                    >
                      {row.place && row.place.name}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        display: "block",
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                      }}
                    >
                      {row.place && row.place.city}
                    </Grid>
                  </Grid>
                </Grid>
              )
            );
          })}
      </>
    );
  };

  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      bodyEdit,
      bodyView,
      homeList,
      pageCountView,
      fromHome,
      pageCount,
    } = this.props;
    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 45,
        paddingBottom: 20,
      },
      changableName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "left",
        fontSize: 20,
      },
      changableBody: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "center",
        fontSize: 16,
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: "#212121",
        textAlign: "left",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
      },
      pageName: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        fontSize: 20,
      },
      changableFirst: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 15,
      },
      changableFirst2: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        fontWeight: "bold",
        color: "#212121",
        textAlign: "center",
        fontSize: 30,
      },
      eventPage: {
        marginTop: "5vh",
        marginBottom: "5vh",
        backgroundColor: "#1a1919",
      },
    });
    const classes = useStyles();
    const { itemPerPage, offset, page } = this.state;

    return (
      <Grid
        item
        xs={12}
        sm={10}
        container
        justify="center"
        style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            direction="column"
            // className={classes.eventPage}
          >
            <Grid
              item
              sm={10}
              xs={12}
              container
              justify="center"
              className={styles.event_body}
            >
              {!homeList && (
                <Grid className={styles.event}>
                  <p style={classes.changableBody}>No event.</p>
                </Grid>
              )}

              {(fromHome || !isEdit) &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment())
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p style={classes.changableBody2}>Upcoming Events</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider color="#212121" />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                this.state.filteredData &&
                this.state.filteredData.filter(
                  (row) =>
                    row &&
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment())
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p style={classes.changableBody2}>Upcoming Events</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider color="#212121" />
                    </Grid>
                  </Grid>
                )}

              {isEdit
                ? fromHome
                  ? this.renderUpComingEvent(homeList.slice(0, 3), classes)
                  : this.renderUpComingEvent(
                      homeList.slice(
                        this.state.page > pageCount ? 0 : this.state.offset,
                        this.state.page > pageCount
                          ? 3
                          : this.state.itemPerPage + this.state.offset
                      ),
                      classes
                    )
                : this.renderUpComingEvent(homeList, classes)}

              <Grid item xs={12}>
                <Divider color="#212121" />
              </Grid>

              {(fromHome || !isEdit) &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime)
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p style={classes.changableBody2}>Past Events</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider color="#212121" />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                this.state.filteredData &&
                this.state.filteredData.filter(
                  (row) =>
                    row &&
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime)
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p style={classes.changableBody2}>Past Events</p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider color="#212121" />
                    </Grid>
                  </Grid>
                )}

              {isEdit
                ? fromHome
                  ? this.renderPassEvent(homeList.slice(0, 3), classes)
                  : this.renderPassEvent(
                      homeList.slice(
                        page > pageCount ? 0 : offset,
                        page > pageCount ? 3 : itemPerPage + offset
                      ),
                      classes
                    )
                : this.renderPassEvent(homeList, classes)}
            </Grid>
            {isEdit
              ? !fromHome &&
                pageCount > 1 && (
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "2.5rem" }}
                  >
                    <Pagination
                      style={{
                        backgroundColor: "white",
                        padding: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                      color="default"
                      shape="rounded"
                      variant="outlined"
                      count={pageCount}
                      page={page > pageCount ? 1 : page}
                      onChange={this.handlePageEditClick}
                    />
                  </Grid>
                )
              : !fromHome &&
                pageCountView > 1 && (
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "2.5rem" }}
                  >
                    <Pagination
                      style={{
                        backgroundColor: "white",
                        padding: "0.4rem",
                        borderRadius: "0.3rem",
                      }}
                      color="default"
                      variant="outlined"
                      shape="rounded"
                      count={pageCountView}
                      page={this.state.pageView}
                      onChange={this.handlePageViewClick}
                    />
                  </Grid>
                )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isEdit: state.site.isEdit,
  titleView: state.site.titleView,
  titleEdit: state.site.titleEdit,
  posts: state.post.posts,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
  pageCountView: state.post.pageCountEventView,
  siteEdit: state.site.siteEdit,
  siteView: state.site.siteView,
});

const mapDispatchToProps = (dispatch) => ({
  getDataByPageNumber: ({ sitePath, page, siteId, pageNumber }) =>
    dispatch(getDataByPageNumber({ sitePath, page, siteId, pageNumber })),
  setEventsToSiteView: (event) => dispatch(setEventsToSiteView(event)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);
