import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BannerComponent from "../../../component/bannerComponent";
import AboutPage from "../about/about";
import ContactPage from "../contact/contact";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import NewsPage from "../new/new";

class Theme1Home extends React.Component {
  renderImage = () => {
    const { isEdit, siteEdit, siteView, newLogo } = this.props;
    if (isEdit) {
      if (newLogo && typeof newLogo === "object" && newLogo.size > 0) {
        return URL.createObjectURL(newLogo);
      } else return siteEdit.logo;
    }
    return siteView.logo;
  };

  render() {
    const { siteEdit, isEdit, siteView } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <BannerComponent bannerType={0} />
        </Grid>
        {isEdit &&
          siteEdit &&
          siteEdit.homepage.map(
            (row, index) =>
              ({
                about: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <EventPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <GalleryPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                )
              }[row.original])
          )}

        {!isEdit &&
          siteView &&
          siteView.homepage.map(
            (row, index) =>
              ({
                about: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <AboutPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                event: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <EventPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                gallery: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <GalleryPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                ),
                contact: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <ContactPage fromHome homeTitle={row.name} />
                  </Grid>
                ),
                news: (
                  <Grid
                    container
                    item
                    key={index}
                    style={{ display: row.isActive ? "block" : "none" }}
                  >
                    <NewsPage
                      fromHome
                      homeTitle={row.name}
                      homeList={row.filter.items}
                    />
                  </Grid>
                )
              }[row.original])
          )}
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
  bodyView: state.site.bodyView,
  newLogo: state.site.newLogo,
  newCover: state.site.newCover
});

export default connect(mapStateToProps, null)(Theme1Home);
