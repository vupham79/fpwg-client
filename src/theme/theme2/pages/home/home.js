import React from "react";
import CarouselImages from "../../components/carousel";
import NewsPage from "../new/new";
import AboutPage from "../about/about";
import EventPage from "../event/event";
import GalleryPage from "../gallery/gallery";
import ContactPage from "../contact/contact";
import { connect } from "react-redux";
import BannerComponent from "../../../component/bannerComponent";
import { Grid } from "@material-ui/core";

class HomePage extends React.Component {
  renderCarousel = () => {
    const { isEdit, covers, siteView } = this.props;
    if (isEdit) {
      if (covers && covers.length > 0) {
        return <CarouselImages />;
      }
    } else {
      if (siteView.cover && siteView.cover.length > 0) {
        return <CarouselImages />;
      }
    }
    return <></>;
  };
  render() {
    const { siteEdit, siteView, isEdit } = this.props;
    return (
      <Grid container>
        <BannerComponent bannerType={0} arrows={false} />
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
                ),
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
                ),
              }[row.original])
          )}
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  covers: state.site.newCover,
});

export default connect(mapStateToProps, null)(HomePage);
