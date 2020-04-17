import { Grid, Divider } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import EventComponent from "../../components/eventComponent";

class Theme1Event extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      fromHome,
      homeTitle,
      homeList,
      siteEdit,
      siteView,
    } = this.props;
    const useStyles = () => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "bold",
      },
    });
    const classes = useStyles();

    return (
      <Grid container justify="center">
        {homeTitle && (
          <Grid
            container
            alignItems="center"
            item
            sm={10}
            xs={10}
            style={{ padding: "2rem 0" }}
          >
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
            <Grid item xs={6} sm={4} style={classes.changableTitle}>
              {homeTitle}
            </Grid>
            <Grid item xs={3} sm={4}>
              <Divider
                style={{
                  backgroundColor: isEdit ? titleEdit.color : titleView.color,
                  height: "3px",
                }}
                variant="fullWidth"
              />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={12} justify="center">
          <EventComponent
            altType
            key={
              this.props.isEdit
                ? this.props.siteEdit.limitEvent
                : this.props.siteView.limitEvent
            }
            homeList={
              isEdit
                ? siteEdit && siteEdit.events && siteEdit.events
                : siteView && siteView.events && siteView.events
            }
            siteInfo={siteView && siteView.sitePath}
            fromHome={fromHome}
            pageCount={Math.ceil(
              isEdit
                ? siteEdit &&
                siteEdit.events &&
                siteEdit.events.length /
                (this.props.isEdit
                  ? this.props.siteEdit.limitEvent
                  : this.props.siteView.limitEvent)
                : siteView &&
                siteView.events &&
                siteView.events.length /
                (this.props.isEdit
                  ? this.props.siteEdit.limitEvent
                  : this.props.siteView.limitEvent)
            )}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  siteEdit: state.site.siteEdit,
  isEdit: state.site.isEdit,
  siteView: state.site.siteView,
  titleEdit: state.site.titleEdit,
  titleView: state.site.titleView,
  bodyEdit: state.site.bodyEdit,
  bodyView: state.site.bodyView,
});

export default connect(mapStateToProps, null)(Theme1Event);
