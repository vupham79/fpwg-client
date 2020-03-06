import { Button, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentEditId, syncDataFromFB } from "../../actions";
import styles from "./main.module.css";

function WebsiteItem({ site, fetchDataFromFB }) {
  return (
    <Grid
      container
      item
      justify="space-between"
      className={styles.web_item}
      style={{ width: "100%" }}
    >
      <Grid
        item
        sm={2}
        md={2}
        xs={4}
        container
        style={{
          backgroundImage: `url(${site.logo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "5rem"
        }}
      />
      <Grid container item sm={6} xs={4}>
        <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
          {site.title}
        </Typography>
      </Grid>
      <Grid
        container
        item
        sm={4}
        xs={4}
        alignItems={"center"}
        justify={"flex-end"}
      >
        <Grid item>
          <Button variant={"outlined"} onClick={() => fetchDataFromFB()}>
            Sync
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

class DataTab extends Component {
  handleFetchData = async pageId => {
    const { fetchDataFromFB, accessToken } = this.props;
    fetchDataFromFB(pageId, accessToken);
  };

  render() {
    const { sites, setCurrentEditId } = this.props;
    return (
      <>
        {sites.length === 0 ? (
          <h3>You don't have any Website. Please create a new site.</h3>
        ) : (
          sites.map((item, index) => (
            <Grid
              item
              container
              md={6}
              sm={12}
              key={index}
              className={styles.siteItem}
            >
              <WebsiteItem
                site={item}
                setCurrentEditId={setCurrentEditId}
                fetchDataFromFB={() => this.handleFetchData(item.id)}
              />
            </Grid>
          ))
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  open: state.dialog.open,
  pages: state.user.pages,
  sites: state.site.data,
  accessToken: state.user.accessToken,
  profile: state.user.profile,
  userId: state.user.profile.id,
  token: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  setCurrentEditId: id => dispatch(setCurrentEditId(id)),
  fetchDataFromFB: (pageId, accessToken) =>
    dispatch(syncDataFromFB(pageId, accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTab);
