import { Button, Grid, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentEditId } from "../../actions";
import Link from "../../component/link";
import SwitchButton from "../../component/SwitchButton";
import styles from "./main.module.css";

function WebsiteItem({ setCurrentEditId, site }) {
  return (
    <Grid container item justify="space-between" className={styles.web_item}>
      <Grid
        item
        sm={2}
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
      <Grid container item sm={6} xs={4} style={{ overflow: "auto" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "bolder" }}>
          {site.title}
        </Typography>
      </Grid>
      <Grid container justify={"flex-end"} item sm={4} xs={4}>
        <Grid container item md={8}>
          <Grid item md={6} sm={6}>
            <Link to={`/${site.sitePath}`}>
              <Button variant={"outlined"}>View</Button>
            </Link>
          </Grid>
          <Grid item md={6} sm={6}>
            <Link to="/edit">
              <Button
                variant={"outlined"}
                onClick={() => setCurrentEditId(site.id)}
              >
                Edit
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid item container md={6}>
          <Grid item>
            <SwitchButton
              siteId={site.id}
              siteName={site.title}
              isPublish={site.isPublish}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

class Design extends Component {
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
              <WebsiteItem site={item} setCurrentEditId={setCurrentEditId} />
            </Grid>
          ))
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  sites: state.site.data
});

const mapDispatchToProps = dispatch => ({
  setCurrentEditId: id => dispatch(setCurrentEditId(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Design);
