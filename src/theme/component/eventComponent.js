import { Divider, Grid, withStyles } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getDataByPageNumber, setEventsToSiteView } from "../../actions";
import styles from "./event.module.css";
const useStyles = (theme) => ({
  paginationItemRoot: {
    color: "#fff",
  },
});

class EventComponent extends React.Component {
  state = {
    pageView: 1,
    offset: 0,
    itemPerPage: this.props.isEdit
      ? this.props.siteEdit.limitEvent
      : this.props.siteView.limitEvent,
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
    // console.log(offset + "-" + (newValue - 1) + "-" + this.state.itemPerPage);
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
      dark,
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
                  // spacing={2}
                  className={styles.contain_event}
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: dark ? "#000" : "#fff",
                  }}
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
                      backgroundImage: `url('${row.cover}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "6rem",
                    }}
                  ></Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={1}
                    style={{ height: "6rem" }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        ...classes.changableFirst,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        ...classes.changableFirst2,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: "block",
                      fontFamily: isEdit
                        ? titleEdit.fontFamily
                        : titleView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                    }}
                  >
                    <Grid item xs={12}>
                      <a
                        href={"https://" + row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: dark && "#fff" }}
                      >
                        {row.name}
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ color: dark ? "#fff" : "#3578e5" }}
                    >
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
                    xs={4}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: isEdit
                        ? siteEdit.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDesEvent
                          ? "block"
                          : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#000",
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
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      color: dark ? "#fff" : "#000",
                    }}
                  >
                    <Grid item xs={12}>
                      {row.place && row.place.name}
                    </Grid>

                    <Grid item xs={12}>
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
      dark,
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
                  // spacing={2}
                  className={styles.contain_event}
                  key={index}
                  style={{
                    padding: "1rem",
                    backgroundColor: dark ? "#000" : "#fff",
                  }}
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
                      backgroundImage: `url('${row.cover}')`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "6rem",
                    }}
                  ></Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={1}
                    style={{ height: "6rem" }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        ...classes.changableFirst,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        ...classes.changableFirst2,
                        color: dark ? "#fff" : "#000",
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={2}
                    style={{
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: "block",
                      fontFamily: isEdit
                        ? titleEdit.fontFamily
                        : titleView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                    }}
                  >
                    <Grid item xs={12}>
                      <a
                        href={"https://" + row.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: dark && "#fff" }}
                      >
                        {row.name}
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{ color: dark ? "#fff" : "#3578e5" }}
                    >
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
                    xs={4}
                    style={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      display: isEdit
                        ? siteEdit.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDesEvent
                          ? "block"
                          : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#000",
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
                      textOverflow: "ellipsis",
                      overflow: "auto",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      height: "6rem",
                      color: dark ? "#fff" : "#000",
                    }}
                  >
                    <Grid item xs={12}>
                      {row.place && row.place.name}
                    </Grid>

                    <Grid item xs={12}>
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
      dark,
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
        // fontSize: 30,
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
        xs={10}
        sm={12}
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
              sm={12}
              xs={12}
              container
              justify="center"
              className={styles.event_body}
              style={dark ? { backgroundColor: "#000" } : {}}
            >
              {!homeList ||
                (homeList && homeList.length === 0 && (
                  <Grid className={styles.event}>
                    <p style={classes.changableBody}>No event.</p>
                  </Grid>
                ))}

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    !row.isCancelled &&
                    moment(row.endTime).isAfter(moment())
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          ...classes.changableBody2,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                homeList &&
                homeList
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 3
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .filter(
                    (row) =>
                      row &&
                      !row.isCancelled &&
                      moment(row.endTime).isAfter(moment())
                  ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          ...classes.changableBody2,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {isEdit
                ? fromHome
                  ? this.renderUpComingEvent(homeList.slice(0, 3), classes)
                  : this.renderUpComingEvent(
                    homeList.slice(
                      page > pageCount ? 0 : offset,
                      page > pageCount
                        ? 3
                        : parseInt(itemPerPage) + parseInt(offset)
                    ),
                    classes
                  )
                : this.renderUpComingEvent(homeList, classes)}

              <Grid item xs={12}>
                <Divider color="#212121" />
              </Grid>

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    (row.isCancelled ||
                      moment(row.endTime).isSameOrBefore(moment()) ||
                      !row.endTime)
                ).length > 0 && (
                  <Grid container item>
                    {dark && (
                      <Grid item xs={12}>
                        <Divider style={{ backgroundColor: "#fff" }} />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <p
                        style={{
                          ...classes.changableBody2,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}

              {!fromHome &&
                homeList &&
                homeList
                  .slice(
                    page > pageCount ? 0 : offset,
                    page > pageCount
                      ? 3
                      : parseInt(itemPerPage) + parseInt(offset)
                  )
                  .filter(
                    (row) =>
                      row &&
                      (row.isCancelled ||
                        moment(row.endTime).isSameOrBefore(moment()) ||
                        !row.endTime)
                  ).length > 0 && (
                  <Grid container item>
                    {dark && (
                      <Grid item xs={12}>
                        <Divider style={{ backgroundColor: "#fff" }} />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <p
                        style={{
                          ...classes.changableBody2,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: dark ? "#fff" : "#000",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider style={{ backgroundColor: dark && "#fff" }} />
                    </Grid>
                  </Grid>
                )}
              {isEdit
                ? fromHome
                  ? this.renderPassEvent(homeList.slice(0, 3), classes)
                  : this.renderPassEvent(
                    homeList.slice(
                      page > pageCount ? 0 : offset,
                      page > pageCount
                        ? 3
                        : parseInt(itemPerPage) + parseInt(offset)
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
                      backgroundColor: dark ? "#000" : "#fff",
                      padding: "0.4rem",
                      borderRadius: "0.3rem",
                    }}
                    renderItem={(item) =>
                      dark ? (
                        <PaginationItem
                          {...item}
                          selected
                          style={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: isEdit
                              ? titleEdit.fontFamily
                              : titleView.fontFamily,
                          }}
                          classes={{
                            root: classes.paginationItemRoot,
                          }}
                        />
                      ) : (
                          <PaginationItem {...item} />
                        )
                    }
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
                      backgroundColor: dark ? "#000" : "#fff",
                      padding: "0.4rem",
                      borderRadius: "0.3rem",
                    }}
                    renderItem={(item) =>
                      dark ? (
                        <PaginationItem
                          {...item}
                          selected
                          style={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: isEdit
                              ? titleEdit.fontFamily
                              : titleView.fontFamily,
                          }}
                          classes={{
                            root: classes.paginationItemRoot,
                          }}
                        />
                      ) : (
                          <PaginationItem {...item} />
                        )
                    }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(EventComponent));
