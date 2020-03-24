import React from "react";
import CarouselImages from "../../components/carousel";
import AboutPage from "../../pages/about";
import { connect } from "react-redux";

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
      <>
        {/* {this.renderCarousel()} */}
        {isEdit
          ? siteEdit &&
            siteEdit.navItems &&
            siteEdit.navItems.map(
              (item, index) =>
                item.original === "about" &&
                item.isActive && <AboutPage key={index} />
            )
          : siteView &&
            siteView.navItems &&
            siteView.navItems.map(
              (item, index) =>
                item.original === "about" &&
                item.isActive && <AboutPage key={index} />
            )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  siteView: state.site.siteView,
  isEdit: state.site.isEdit,
  siteEdit: state.site.siteEdit,
  covers: state.site.newCover
});

export default connect(mapStateToProps, null)(HomePage);
