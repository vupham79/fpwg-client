import { Divider, Grid, withStyles } from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { getDataByPageNumber, setEventsToSiteView } from "../../actions";
import styles from "./event.module.css";
const useStyles = (theme) => ({
  paginationItemSelected: {
    backgroundColor: "#fff !important",
    color: "#000 !important",
  },
  paginationItemEllipses: {
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
      altType,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              row.isActive &&
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
                    borderBottom: altType ? "1px solid" : "none",
                    borderColor: dark ? "#000" : "#d4e1db",
                    marginTop: altType ? 70 : 0
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showCoverEvent
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
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        textAlign: "right",
                        paddingRight: 15,
                        fontSize: 15,
                        color: dark ? "#fff" : "#535353",
                        marginTop: altType ? -10 : 0
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        fontWeight: "bold",
                        textAlign: "right",
                        paddingRight: 15,
                        color: altType ? (isEdit ? titleEdit.color : titleView.color) : (dark ? "#fff" : "#535353"),
                        fontSize: altType ? 30 : 19,
                        marginTop: altType ? -50 : -40
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={
                      isEdit
                        ? !siteEdit.showDetailSetting.showDesEvent ||
                          !siteEdit.showDetailSetting.showPlaceEvent
                          ? 5
                          : (altType ? 5 : 2)
                        : !siteView.showDetailSetting.showDesEvent ||
                          !siteView.showDetailSetting.showPlaceEvent
                          ? 5
                          : (altType ? 5 : 2)
                    }
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
                        style={{
                          color: dark ? "#fff" : "#535353",
                          fontSize: altType ? 19 : 16,
                          textDecoration: "none",
                          marginTop: altType ? 30 : 0
                        }}
                      >
                        {row.name}
                        <span style={{
                          display: isEdit
                            ? siteEdit.showDetailSetting.showPlaceEvent && altType
                              ? "inline-block"
                              : "none"
                            : siteView.showDetailSetting.showPlaceEvent && altType
                              ? "inline-block"
                              : "none",

                        }}> / <p style={{ color: dark ? "#fff" : "#a0a09f", fontSize: 10, display: "inline-block" }}>{row.place && row.place.city}</p></span>
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        color: dark ? "#fff" : "#3578e5",
                        display: altType ? "none" : "inline-block",
                      }}
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
                        ? siteEdit.showDetailSetting.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showDesEvent
                          ? "block"
                          : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#535353",
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
                        ? siteEdit.showDetailSetting.showPlaceEvent && !altType
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showPlaceEvent && !altType
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
                      color: dark ? "#fff" : "#535353",
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
      altType,
    } = this.props;
    return (
      <>
        {homeList &&
          homeList.map((row, index) => {
            return (
              row &&
              row.isActive &&
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
                    borderBottom: altType ? "1px solid" : "none",
                    borderColor: dark ? "#000" : "#d4e1db",
                    marginTop: altType ? 70 : 0
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      display: isEdit
                        ? siteEdit.showDetailSetting.showCoverEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showCoverEvent
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
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        color: isEdit ? titleEdit.color : titleView.color,
                        textAlign: "right",
                        paddingRight: 15,
                        fontSize: 15,
                        color: dark ? "#fff" : "#535353",
                        marginTop: altType ? -10 : 0
                      }}
                    >
                      {moment(row.startTime).format("MMM").toUpperCase()}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontFamily: isEdit
                          ? titleEdit.fontFamily
                          : titleView.fontFamily,
                        fontWeight: "bold",
                        textAlign: "right",
                        paddingRight: 15,
                        color: altType ? (isEdit ? titleEdit.color : titleView.color) : (dark ? "#fff" : "#535353"),
                        fontSize: altType ? 30 : 19,
                        marginTop: altType ? -50 : -40
                      }}
                    >
                      {moment(row.startTime).format("D") + " "}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    item
                    xs={
                      isEdit
                        ? !siteEdit.showDetailSetting.showDesEvent ||
                          !siteEdit.showDetailSetting.showPlaceEvent
                          ? 5
                          : (altType ? 5 : 2)
                        : !siteView.showDetailSetting.showDesEvent ||
                          !siteView.showDetailSetting.showPlaceEvent
                          ? 5
                          : (altType ? 5 : 2)
                    }
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
                        style={{
                          color: dark ? "#fff" : "#535353",
                          fontSize: altType ? 19 : 16,
                          textDecoration: "none",
                          marginTop: altType ? 30 : 0
                        }}
                      >
                        {row.name}
                        <span style={{
                          display: isEdit
                            ? siteEdit.showDetailSetting.showPlaceEvent && altType
                              ? "inline-block"
                              : "none"
                            : siteView.showDetailSetting.showPlaceEvent && altType
                              ? "inline-block"
                              : "none",

                        }}> / <p style={{ color: dark ? "#fff" : "#a0a09f", fontSize: 10, display: "inline-block" }}>{row.place && row.place.city}</p></span>
                      </a>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        color: dark ? "#fff" : "#3578e5",
                        display: altType ? "none" : "inline-block",
                      }}
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
                        ? siteEdit.showDetailSetting.showDesEvent
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showDesEvent
                          ? "block"
                          : "none",
                      height: "6rem",
                      lineHeight: "1.5em",
                      fontFamily: isEdit
                        ? bodyEdit.fontFamily
                        : bodyView.fontFamily,
                      color: dark ? "#fff" : "#535353",
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
                        ? siteEdit.showDetailSetting.showPlaceEvent && !altType
                          ? "block"
                          : "none"
                        : siteView.showDetailSetting.showPlaceEvent && !altType
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
                      color: dark ? "#fff" : "#535353",
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
      classes,
      altType,
      siteEdit,
      siteView
    } = this.props;
    const { itemPerPage, offset, page } = this.state;
    return (
      <Grid
        item
        xs={12}
        sm={12}
        container
        justify="center"
      // style={{ marginTop: "2.5rem", marginBottom: "2.5rem" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            direction="column"
          // className={{
          //   marginTop: "5vh",
          //   marginBottom: "5vh",
          //   backgroundColor: "#1a1919",
          // }}
          >
            <Grid
              item
              sm={
                isEdit
                  ? siteEdit.showDetailSetting.showPlaceEvent && siteEdit.showDetailSetting.showCoverEvent
                    ? 10
                    : 8
                  : siteView.showDetailSetting.showPlaceEvent && siteView.showDetailSetting.showCoverEvent
                    ? 10
                    : 8
              }
              xs={12}
              container
              justify="center"
              className={altType ? null : styles.event_body}
              style={dark ? { backgroundColor: "#000" } : {}}
            >
              {!homeList ||
                (homeList && homeList.length === 0 && (
                  <Grid
                    className={styles.event}
                    style={{ backgroundColor: dark ? "#000" : "#fff" }}
                  >
                    <p
                      style={{
                        fontFamily: isEdit
                          ? bodyEdit.fontFamily
                          : bodyView.fontFamily,
                        color: dark ? "#fff" : "#212121",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      No Event
                    </p>
                  </Grid>
                ))}

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    !row.isCancelled &&
                    row.isActive &&
                    moment(row.endTime).isAfter(moment())
                ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          fontSize: altType ? 20 : 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: altType
                            ? isEdit
                              ? titleEdit.color
                              : titleView.color
                            : dark
                              ? "#fff"
                              : "#000",
                          textAlign: altType ? "center" : "left",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        style={{
                          backgroundColor: dark && "#fff",
                          display: altType ? "none" : "block",
                        }}
                      />
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
                      row.isActive &&
                      moment(row.endTime).isAfter(moment())
                  ).length > 0 && (
                  <Grid container item>
                    <Grid item xs={12}>
                      <p
                        style={{
                          fontSize: altType ? 20 : 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: altType
                            ? isEdit
                              ? titleEdit.color
                              : titleView.color
                            : dark
                              ? "#fff"
                              : "#000",
                          textAlign: altType ? "center" : "left",
                        }}
                      >
                        Upcoming Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        style={{
                          backgroundColor: dark && "#fff",
                          display: altType ? "none" : "block",
                        }}
                      />
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
                <Divider
                  color="#212121"
                  style={{ display: altType ? "none" : "block" }}
                />
              </Grid>

              {fromHome &&
                homeList &&
                homeList.filter(
                  (row) =>
                    row &&
                    row.isActive &&
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
                          fontSize: altType ? 20 : 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: altType
                            ? isEdit
                              ? titleEdit.color
                              : titleView.color
                            : dark
                              ? "#fff"
                              : "#000",
                          textAlign: altType ? "center" : "left",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        style={{
                          backgroundColor: dark && "#fff",
                          display: altType ? "none" : "block",
                        }}
                      />
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
                      row.isActive &&
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
                          fontSize: altType ? 20 : 16,
                          fontWeight: "bold",
                          marginLeft: 10,
                          fontFamily: isEdit
                            ? titleEdit.fontFamily
                            : titleView.fontFamily,
                          color: altType
                            ? isEdit
                              ? titleEdit.color
                              : titleView.color
                            : dark
                              ? "#fff"
                              : "#000",
                          textAlign: altType ? "center" : "left",
                        }}
                      >
                        Past Events
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider
                        style={{
                          backgroundColor: dark && "#fff",
                          display: altType ? "none" : "block",
                        }}
                      />
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
                      // padding: "0.4rem",
                      // borderRadius: "0.3rem",
                    }}
                    renderItem={(item) =>
                      dark ? (
                        <PaginationItem
                          {...item}
                          style={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: isEdit
                              ? titleEdit.fontFamily
                              : titleView.fontFamily,
                          }}
                          classes={{
                            selected: classes.paginationItemSelected,
                            ellipsis: classes.paginationItemEllipses,
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
                          style={{
                            color: "white",
                            borderColor: "white",
                            fontFamily: isEdit
                              ? titleEdit.fontFamily
                              : titleView.fontFamily,
                          }}
                          classes={{
                            selected: classes.paginationItemSelected,
                            ellipsis: classes.paginationItemEllipses,
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
