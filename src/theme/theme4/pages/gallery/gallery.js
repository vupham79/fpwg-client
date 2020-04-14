import { Grid, Divider } from "@material-ui/core";
import React from "react";
import Gallery from "../../components/gallery";
import { connect } from "react-redux";

class Theme4Gallery extends React.Component {
  state = {
    itemPerPage: 3,
  };
  render() {
    const {
      isEdit,
      titleEdit,
      titleView,
      siteEdit,
      siteView,
      bodyEdit,
      bodyView,
      fromHome,
      homeTitle,
      homeList,
    } = this.props;

    const useStyles = (theme) => ({
      changableTitle: {
        fontFamily: isEdit ? titleEdit.fontFamily : titleView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 36,
        lineHeight: "1.4em",
        fontWeight: "bold",
      },
      changableBody2: {
        fontFamily: isEdit ? bodyEdit.fontFamily : bodyView.fontFamily,
        color: isEdit ? titleEdit.color : titleView.color,
        textAlign: "center",
        fontSize: 20,
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

        <Grid container item xs={10} style={{ padding: "2.5rem 0" }}>
          {isEdit ? (
            siteEdit && siteEdit.galleries ? (
              <Gallery
                key={siteEdit.limitGallery}
                galleries={fromHome && homeList ? homeList : siteEdit.galleries}
                siteInfo={siteEdit.id}
                fromHome={fromHome}
                pageCount={Math.ceil(
                  (fromHome && homeList ? homeList : siteEdit.galleries)
                    .length / siteEdit.limitGallery
                )}
              />
            ) : (
              <p style={classes.changableBody2}>
                Currently no photo available.
              </p>
            )
          ) : siteView && siteView.galleries ? (
            <Gallery
              galleries={siteView.galleries}
              siteInfo={siteView.sitePath}
              fromHome={fromHome}
            />
          ) : (
            <p style={classes.changableBody2}>Currently no photo available.</p>
          )}
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

export default connect(mapStateToProps, null)(Theme4Gallery);
