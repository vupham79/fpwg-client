import React from "react";
import CarouselImages from "../../components/carousel";
import New from "../../pages/new";
import Gallery from "../../components/gallery";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <CarouselImages />
        <New />
        <Gallery />
      </>
    );
  }
}

export default HomePage;
