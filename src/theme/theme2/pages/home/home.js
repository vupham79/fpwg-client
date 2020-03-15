import React from "react";
import CarouselImages from "../../components/carousel";
import New from "../../pages/new";
import EventPage from "../../pages/event";
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
        {this.renderCarousel()}
        {isEdit
          ? siteEdit &&
            siteEdit.navItems &&
            siteEdit.navItems.map(
              (item, index) =>
                (item.original === "news" && item.isActive && (
                  <New key={index} />
                )) ||
                (item.original === "event" && item.isActive && (
                  <EventPage key={index} />
                ))
            )
          : siteView &&
            siteView.navItems &&
            siteView.navItems.map(
              (item, index) =>
                (item.original === "news" && item.isActive && (
                  <New key={index} />
                )) ||
                (item.original === "event" && item.isActive && (
                  <EventPage key={index} />
                ))
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
